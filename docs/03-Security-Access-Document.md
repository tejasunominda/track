# Security & Access Document
## TrackForge — Enterprise Project & Issue Tracking Platform

**Version:** 1.0
**Audience:** Engineering, Security/Compliance stakeholders

---

## 1. Security Principles
1. **Zero Trust between services** — every internal service call is authenticated (mTLS or signed service token), not just the perimeter.
2. **Least privilege by default** — new users/roles start with minimal permissions; access is explicitly granted.
3. **Defense in depth** — network layer (VPC/security groups), application layer (Spring Security), and data layer (Postgres RLS) all independently enforce tenant/access boundaries.
4. **Everything is audited** — every mutating action is attributable to a user, timestamp, and IP.
5. **Secure by default configuration** — MFA encouraged/enforceable, session timeouts, strong password policy, no plaintext secrets.

## 2. Authentication

### 2.1 Identity Providers
- **Native auth:** email + password (bcrypt/Argon2 hashed, never reversible), with mandatory password complexity policy and breach-database check (e.g., HaveIBeenPwned k-anonymity API) at signup/reset.
- **Enterprise SSO (Enterprise tier):**
  - SAML 2.0 (for Okta, Azure AD, OneLogin, PingFederate).
  - OpenID Connect / OAuth2 (Google Workspace, Azure AD, generic OIDC providers).
- **MFA:** TOTP (authenticator app) mandatory-toggle at org level; SMS as fallback (optional, flagged as weaker).
- **Session model:** Short-lived JWT access token (15 min) + rotating refresh token (httpOnly, Secure, SameSite=Strict cookie), refresh token revocable server-side (stored hashed in Redis/Postgres with device fingerprint).
- **API tokens:** Personal Access Tokens (PATs) for programmatic API access, scoped, with expiration and revocation list; displayed only once at creation.

### 2.2 Account Security Controls
- Account lockout after N failed login attempts (progressive backoff + optional CAPTCHA).
- Forced re-authentication for sensitive admin actions (permission scheme changes, user deletion, billing changes) — "step-up auth."
- Device/session management page: users can view and revoke active sessions.
- Suspicious login detection (new device/geo) triggers email alert.

## 3. Authorization Model (RBAC + Project-Scoped Roles)

### 3.1 Three-Tier Permission Model
1. **Global (Organization) Roles** — `Org Admin`, `Org Member`, `Billing Admin`. Controls tenant-wide settings, user provisioning, global schemes.
2. **Project Roles** — `Project Admin`, `Member`, `Viewer`, plus custom roles defined per org (e.g., `QA`, `Contractor`). Assigned per-project, per-user or per-group.
3. **Permission Schemes** — a named set of fine-grained permissions (e.g., `CREATE_ISSUE`, `EDIT_ISSUE`, `DELETE_ISSUE`, `TRANSITION_ISSUE`, `MANAGE_SPRINTS`, `ADMINISTER_PROJECT`) mapped to Project Roles, reusable across projects.

### 3.2 Permission Enforcement Points
- **API layer:** Every controller method annotated with `@PreAuthorize` checks derived from the permission scheme for that project + the resolved role of the requesting user (Spring Security method security, backed by a custom `PermissionEvaluator`).
- **Data layer:** Postgres RLS ensures tenant isolation as a hard backstop even if application-layer authorization has a bug (see Architecture Doc §3).
- **Frontend:** UI hides/disables actions the user lacks permission for, but this is a UX convenience only — never the source of truth (all enforcement is server-side).

### 3.3 Field-Level & Issue-Level Security (Enterprise tier)
- Issue-level security schemes: restrict visibility of specific issues to named roles/groups (e.g., HR or Security issue types visible only to specific groups) — modeled as an optional `security_level_id` on `issues`, joined against a `security_level_membership` table, enforced in the same query filter as tenant RLS.

## 4. Data Protection

| Concern | Control |
|---|---|
| Encryption in transit | TLS 1.2+ enforced everywhere (frontend↔API, service↔service, service↔DB) |
| Encryption at rest | AES-256 at the storage layer (RDS encryption, S3 SSE) |
| Secrets management | AWS Secrets Manager / HashiCorp Vault — no secrets in code or env files committed to VCS |
| PII handling | User PII (name, email) isolated to `users` table; exportable/erasable for GDPR data subject requests |
| Backups | Automated daily encrypted backups, point-in-time recovery (35-day window on Enterprise tier) |
| Attachment scanning | Uploaded files scanned for malware (e.g., ClamAV or cloud-native scanning) before being served |

## 5. Audit Logging

- **Scope:** Every create/update/delete/permission-change/login/export action is logged.
- **Audit record schema:** `{ id, tenant_id, actor_user_id, action, entity_type, entity_id, before_state (JSON), after_state (JSON), ip_address, user_agent, timestamp }`.
- **Storage:** Append-only table (no UPDATE/DELETE grants at the DB role level for the application user — enforced via Postgres role permissions), asynchronously written via Kafka to avoid impacting request latency.
- **Retention:** 1 year default, configurable/exportable for Enterprise tier compliance needs.
- **Access:** Org Admins can view/filter/export their own tenant's audit log; platform SREs have break-glass access (itself logged) for support/incident response.

## 6. Tenant Isolation Guarantees
- Row-Level Security policies at the Postgres level (see Architecture Doc §3) are the primary isolation control — application code cannot bypass them even via raw SQL, since the DB connection role itself is scoped.
- Cross-tenant references (e.g., a user belonging to multiple orgs) are modeled via a separate `memberships` table — a `users` row is never directly tenant-owned data, avoiding ambiguous isolation edge cases.
- Object storage (S3) uses tenant-prefixed keys (`/{tenant_id}/attachments/...`) with bucket policies scoping access per request via short-lived pre-signed URLs (never long-lived public URLs).

## 7. Network & Infrastructure Security
- VPC with private subnets for database/cache/search; only the API gateway/load balancer is internet-facing.
- WAF (Web Application Firewall) in front of the API for OWASP Top 10 protection (SQLi, XSS, common bot patterns).
- Rate limiting per IP and per authenticated tenant/token to mitigate abuse and brute force.
- Regular dependency vulnerability scanning (Dependabot/Snyk) in CI; build fails on critical CVEs.
- Container images scanned pre-deploy; least-privilege IAM roles per service (no shared "god" credentials).

## 8. Compliance Posture
- Architecture and controls designed to support **SOC 2 Type II** audit readiness (access control, change management, monitoring, incident response all in scope).
- **GDPR:** data export and "right to be forgotten" (user anonymization/deletion) supported via admin tooling and API.
- Data Processing Agreement (DPA) template to be provided to enterprise customers (legal/compliance deliverable, not engineering).

## 9. Incident Response
- Centralized logging (ELK/OpenSearch) with alerting (Prometheus Alertmanager / PagerDuty integration) on anomalous patterns (mass data export, repeated auth failures, privilege escalation attempts).
- Documented incident response runbook (severity levels, escalation paths, customer communication SLA) — to be maintained in the internal ops wiki, referenced but not detailed here.

## 10. Security Requirements Checklist for Engineering (Traceable to Feature Tickets)
- [ ] Spring Security config with JWT resource server + SAML2/OIDC relying party
- [ ] `PermissionEvaluator` implementation wired to Permission Scheme model
- [ ] Postgres RLS policies on all tenant-scoped tables
- [ ] Audit log Kafka consumer + append-only table with restricted grants
- [ ] Secrets pulled from Vault/Secrets Manager at runtime, never baked into images
- [ ] Rate limiting middleware at gateway
- [ ] Malware scanning pipeline for attachment uploads
- [ ] Session/device management endpoints
- [ ] MFA enrollment + enforcement flow
- [ ] GDPR export/delete admin endpoints
