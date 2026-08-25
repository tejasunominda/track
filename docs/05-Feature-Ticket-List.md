# Feature Ticket List
## TrackForge — Enterprise Project & Issue Tracking Platform

**Version:** 1.0
**Purpose:** Decomposed, buildable ticket backlog for engineering execution (human or AI-assisted, e.g., Windsurf). Organized by Epic → Ticket, phased per PRD §8. Each ticket is scoped to be independently implementable.

**Ticket format:** `[ID] Title — Description — Acceptance Criteria — Depends On`

---

## PHASE 1 — MVP

### Epic 1: Platform Foundation & Multi-Tenancy
- **[F1-01] Repo & project scaffolding** — Set up Spring Boot modular monolith skeleton + React/Vite/TS skeleton per Architecture Doc §8. AC: both apps build/run locally, CI pipeline runs lint+test on PR. Depends: none.
- **[F1-02] PostgreSQL schema + Flyway migration baseline** — Create `organizations`, `users`, `memberships` tables. AC: migrations run cleanly on fresh DB. Depends: F1-01.
- **[F1-03] Row-Level Security setup** — Implement `tenant_id` RLS policies + Spring interceptor to set `app.current_tenant`. AC: cross-tenant query returns zero rows in integration test. Depends: F1-02.
- **[F1-04] Tenant provisioning flow** — Org signup creates `organizations` row + first Org Admin user. AC: new org gets isolated workspace, subdomain routing works. Depends: F1-03.
- **[F1-05] Docker Compose local dev environment** — Postgres, Redis, backend, frontend in one `docker-compose up`. Depends: F1-01.

### Epic 2: Authentication & Authorization
- **[F2-01] Email/password auth (Spring Security + JWT)** — Signup, login, logout, password reset via email. AC: JWT issued/validated, refresh token rotation works. Depends: F1-04.
- **[F2-02] RBAC data model** — `roles`, `permissions`, `project_roles`, `permission_schemes` tables + seed default schemes. Depends: F1-02.
- **[F2-03] `PermissionEvaluator` + `@PreAuthorize` enforcement** — Wire method-level security across all controllers. AC: unauthorized action returns 403 with correct error envelope. Depends: F2-02.
- **[F2-04] Frontend auth flow** — Login/signup/forgot-password pages, token storage, protected route wrapper, auto-refresh. Depends: F2-01.
- **[F2-05] MFA (TOTP) enrollment & verification** — Depends: F2-01.
- **[F2-06] Session/device management UI + API** — List/revoke active sessions. Depends: F2-01.

### Epic 3: Projects
- **[F3-01] Project CRUD API** — Create/read/update/archive project, Scrum/Kanban/Business template selection. Depends: F2-03.
- **[F3-02] Project roles & membership management API** — Assign users/groups to project roles. Depends: F2-02, F3-01.
- **[F3-03] Project settings UI** — General, People, Permissions tabs. Depends: F3-02.
- **[F3-04] Project list/creation UI** — Grid/list of projects, "Create Project" wizard (template picker). Depends: F3-01.

### Epic 4: Issue Types, Fields & Workflows
- **[F4-01] Issue type model + default types (Epic/Story/Task/Bug/Sub-task)** — Depends: F3-01.
- **[F4-02] Custom field definitions (org-level library)** — Text/number/dropdown/multiselect/date/user-picker types. Depends: F1-04.
- **[F4-03] Field configuration per project/issue type** — Map custom fields to issue types. Depends: F4-01, F4-02.
- **[F4-04] Workflow model** — Statuses, transitions, status categories (To Do/In Progress/Done). Depends: F3-01.
- **[F4-05] Default workflow schemes seed (Scrum & Kanban templates)** — Depends: F4-04.
- **[F4-06] Workflow transition engine** — Validate transitions, run conditions/validators/post-functions. AC: illegal transition rejected with clear error. Depends: F4-04.

### Epic 5: Issues (Core)
- **[F5-01] Issue CRUD API** — Create/read/update/delete with full field set from PRD §4.2. Depends: F4-06.
- **[F5-02] Issue linking API** — blocks/relates/duplicates/clones relationships. Depends: F5-01.
- **[F5-03] Sub-task API** — Create sub-task under parent, independent status. Depends: F5-01.
- **[F5-04] Attachments API** — Upload to S3, malware scan hook, download via pre-signed URL. Depends: F5-01.
- **[F5-05] Comments API** — CRUD, @mention parsing, edit history. Depends: F5-01.
- **[F5-06] Issue activity/history log** — Field-change audit trail per issue. Depends: F5-01, Security Doc §5.
- **[F5-07] Issue Detail UI (page/modal)** — Full layout per Frontend Spec §4.3, inline editing, optimistic updates. Depends: F5-01–F5-06.
- **[F5-08] Rich text editor integration (Tiptap)** — Description & comment fields, mentions, code blocks, image paste. Depends: F5-05.
- **[F5-09] Issue creation modal (global "Create" button)** — Depends: F5-01.
- **[F5-10] Bulk operations API + UI** — Bulk edit/transition/move. Depends: F5-01, F4-06.

### Epic 6: Boards
- **[F6-01] Board model + column-to-status mapping** — Depends: F4-04.
- **[F6-02] Kanban board API** — Fetch board state, WIP limits. Depends: F6-01.
- **[F6-03] Scrum board API** — Includes active sprint filter. Depends: F6-01, Epic 7.
- **[F6-04] Board UI (drag-and-drop)** — `@dnd-kit` implementation per Frontend Spec §4.1. Depends: F6-02.
- **[F6-05] Board swimlanes & quick filters** — Depends: F6-04.
- **[F6-06] Real-time board sync (WebSocket)** — Broadcast card-moved/updated events. Depends: F6-04, Architecture Doc §5.

### Epic 7: Sprints & Backlog
- **[F7-01] Sprint model + CRUD API** — Create/start/complete sprint, goal, date range. Depends: F3-01.
- **[F7-02] Backlog ranking API** — Ordered issue list, drag-to-reorder persistence (LexoRank or similar). Depends: F5-01.
- **[F7-03] Sprint start/complete logic** — Incomplete issue rollover to next sprint/backlog. Depends: F7-01.
- **[F7-04] Backlog UI** — Sprint sections + backlog section, drag-drop, inline story points. Depends: F7-02, Frontend Spec §4.2.
- **[F7-05] Epic panel (backlog right rail)** — Depends: F7-04.

### Epic 8: Notifications
- **[F8-01] Notification event model + scheme config** — Depends: F5-01.
- **[F8-02] Async notification dispatch (Kafka consumer)** — Depends: F8-01, Architecture Doc §2.
- **[F8-03] Email notification templates + sender** — Depends: F8-02.
- **[F8-04] In-app notification center UI** — Bell icon, dropdown, mark-as-read. Depends: F8-01.

### Epic 9: Basic Reporting
- **[F9-01] Burndown chart API** — Sprint scope vs. remaining work over time. Depends: F7-01.
- **[F9-02] Velocity chart API** — Depends: F7-03.
- **[F9-03] Reports UI (charts + table)** — Recharts implementation per Frontend Spec §4.6. Depends: F9-01, F9-02.

### Epic 10: Core REST API & Search (Basic)
- **[F10-01] OpenAPI spec generation (springdoc)** — Depends: all Phase 1 API tickets.
- **[F10-02] Generated TypeScript API client pipeline** — Depends: F10-01.
- **[F10-03] Basic keyword search (Postgres full-text, pre-Elasticsearch)** — Depends: F5-01.
- **[F10-04] Global search UI (command palette)** — Depends: F10-03.

---

## PHASE 2

### Epic 11: Advanced Search (TQL + Elasticsearch)
- **[F11-01] Elasticsearch indexing pipeline (Kafka → ES sync)** — Depends: F5-01, Architecture Doc §2.
- **[F11-02] TQL parser & query engine** — Depends: F11-01.
- **[F11-03] TQL autocomplete API** — Depends: F11-02.
- **[F11-04] Advanced query builder UI + saved filters** — Depends: F11-03.

### Epic 12: Dashboards
- **[F12-01] Dashboard model + widget config storage** — Depends: F3-01.
- **[F12-02] Dashboard widget data APIs** (per widget type in PRD §4.6) — Depends: F11-02.
- **[F12-03] Dashboard grid UI (`react-grid-layout`)** — Depends: F12-01.
- **[F12-04] Widget gallery + config panel** — Depends: F12-03.

### Epic 13: Enterprise SSO & Advanced Security
- **[F13-01] SAML2 relying party integration** — Depends: F2-01.
- **[F13-02] OIDC integration** — Depends: F2-01.
- **[F13-03] SCIM provisioning endpoint** — Depends: F13-01/F13-02.
- **[F13-04] Audit log service (Kafka consumer + append-only store)** — Depends: Security Doc §5.
- **[F13-05] Audit log viewer UI** — Depends: F13-04.
- **[F13-06] Issue-level security schemes** — Depends: F5-01, F2-02.

### Epic 14: Workflow Builder & Admin Console
- **[F14-01] Visual workflow builder canvas (React Flow)** — Depends: F4-04, Frontend Spec §4.7.
- **[F14-02] Transition condition/validator/post-function config UI** — Depends: F14-01.
- **[F14-03] Admin console shell + navigation** — Depends: F2-02.
- **[F14-04] User & group management UI (bulk CSV invite)** — Depends: F14-03.
- **[F14-05] Custom field management UI** — Depends: F4-02.

### Epic 15: Git & Chat Integrations
- **[F15-01] Webhook model + dispatcher service** — Depends: Architecture Doc §2.
- **[F15-02] GitHub integration (commit/PR linking)** — Depends: F15-01.
- **[F15-03] GitLab/Bitbucket integration** — Depends: F15-01.
- **[F15-04] Slack/Teams notification integration** — Depends: F15-01, Epic 8.

---

## PHASE 3

### Epic 16: Service Desk Module
- **[F16-01] Customer portal (public-facing ticket submission)** — Depends: F3-01.
- **[F16-02] SLA policy model + breach tracking** — Depends: F16-01.
- **[F16-03] Agent queue UI** — Depends: F16-01.

### Epic 17: Advanced Reporting & Portfolio
- **[F17-01] Cross-project roadmap/timeline view** — Depends: F7-01, Epic 12.
- **[F17-02] Workload/capacity reports** — Depends: F5-01.
- **[F17-03] PDF/CSV export for dashboards & reports** — Depends: Epic 12.

### Epic 18: Billing & Licensing
- **[F18-01] Subscription tier model + feature gating middleware** — Depends: F1-04.
- **[F18-02] Payment provider integration (Stripe)** — Depends: F18-01.
- **[F18-03] Billing admin UI** — Depends: F18-02.

---

## Ticket Sizing Guide (for sprint planning)
- **XS** (few hours): config/seed tickets (e.g., F4-05, F1-05)
- **S** (~1 day): single CRUD endpoint or single UI component
- **M** (2–3 days): full feature slice with API + UI (e.g., F5-07, F6-04)
- **L** (1 week+): cross-cutting infra (e.g., F1-03 RLS, F11-01 ES pipeline, F14-01 workflow builder)

## Suggested Execution Order
1. Epic 1 → 2 → 3 (foundation, auth, projects) — nothing else is buildable without these.
2. Epic 4 → 5 (issue model is the heart of the system).
3. Epic 6 → 7 in parallel (boards depend on issues; sprints depend on issues).
4. Epic 8 → 9 → 10 to complete MVP.
5. Re-evaluate Phase 2 priority with stakeholders once MVP is in staging (per PRD §10 open questions).
