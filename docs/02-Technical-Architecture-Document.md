# Technical Architecture Document
## TrackForge — Enterprise Project & Issue Tracking Platform

**Version:** 1.0
**Audience:** Engineering team / AI coding agents (Windsurf)
**Companion Docs:** PRD, Security & Access, Frontend Specification, Feature Ticket List

---

## 1. Technology Stack Decision

### 1.1 Backend: Spring Boot
- **Language/Runtime:** Java 21 (LTS), Spring Boot 3.x
- **Rationale:** Mature ecosystem for enterprise RBAC, transactional workflow engines, and multi-tenant data access patterns. Strong tooling for audit logging (Spring AOP/interceptors), security (Spring Security), and horizontal scaling.

### 1.2 Frontend: React + TypeScript (Vite) — recommended over Next.js
**Recommendation: React 18 + TypeScript, bundled with Vite, NOT Next.js.**

Reasoning:
- TrackForge is an authenticated, behind-login application. Next.js's core value (SSR/SSG for SEO and fast first paint of public marketing pages) does not apply to the app itself — only to a separate public marketing site, which can be a lightweight static site if needed.
- Board drag-and-drop, real-time collaborative editing, and dense client-side state (Jira-like) are easier to reason about in a pure SPA without hydration mismatches.
- Vite gives faster dev iteration, which matters for AI-assisted development (Windsurf) generating and re-generating components rapidly.
- If a marketing/docs site is needed later, use Next.js separately for that — do not force the app itself into SSR.

*If your organization has a hard requirement for Next.js (e.g., existing infra, edge rendering needs), the architecture below still applies — swap the Vite build step for Next.js App Router in client-rendered mode (`"use client"` on nearly all routes) and keep the API layer identical.*

### 1.3 Full Stack Summary

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, TanStack Query, Zustand/Redux Toolkit, React Router, Tailwind CSS + shadcn/ui component primitives |
| Backend API | Spring Boot 3 (Java 21), Spring Web MVC, Spring Security, Spring Data JPA |
| Auth | Spring Authorization Server / OAuth2 Resource Server, JWT access tokens, SAML2 & OIDC for enterprise SSO |
| Primary DB | PostgreSQL 15+ (multi-tenant, row-level isolation) |
| Search | Elasticsearch / OpenSearch (full-text issue search, TQL execution) |
| Cache | Redis (session cache, rate limiting, board state caching) |
| Message Queue | Apache Kafka (or RabbitMQ for smaller scale) — async events: notifications, webhooks, audit log writes, search indexing |
| File Storage | S3-compatible object storage (attachments, avatars) |
| Real-time | WebSocket (Spring WebSocket / STOMP) for live board updates, presence, comment updates |
| Containerization | Docker, Kubernetes (EKS/AKS) for production orchestration |
| CI/CD | GitHub Actions → container registry → K8s rolling deploy |
| Observability | OpenTelemetry, Prometheus + Grafana, ELK/OpenSearch for logs, Sentry for frontend error tracking |

## 2. High-Level System Architecture

```
                         ┌─────────────────────┐
                         │   CDN / WAF (CloudFront)│
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │  React SPA (static)   │
                         └──────────┬───────────┘
                                    │ HTTPS/REST + WSS
                         ┌──────────▼───────────┐
                         │   API Gateway / LB     │
                         │ (Rate limit, TLS term) │
                         └──────────┬───────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
┌───────▼────────┐        ┌─────────▼─────────┐       ┌─────────▼─────────┐
│  Auth Service   │        │  Core API Service   │       │  Search Service    │
│ (Spring Boot)   │        │  (Spring Boot        │       │  (Spring Boot +    │
│ OAuth2/OIDC/SAML│        │   Modular Monolith:   │       │   Elasticsearch)   │
└───────┬────────┘        │  Projects, Issues,   │       └─────────┬─────────┘
        │                 │  Workflows, Boards,   │                 │
        │                 │  Sprints, Comments)   │                 │
        │                 └──────────┬──────────┘                 │
        │                            │                              │
        │                 ┌──────────▼──────────┐                  │
        │                 │   Kafka Event Bus     │◄─────────────────┘
        │                 └──────────┬──────────┘
        │                            │
        │        ┌───────────────────┼────────────────────┐
        │        │                   │                    │
┌───────▼──┐ ┌────▼─────┐   ┌─────────▼────────┐  ┌─────────▼────────┐
│PostgreSQL│ │Notification│   │  Webhook Dispatcher │  │  Audit Log Service │
│(primary) │ │  Service   │   │      Service         │  │  (write-only store) │
└──────────┘ └───────────┘   └─────────────────────┘  └────────────────────┘
        │
┌───────▼──────┐   ┌──────────────┐
│ Redis (cache) │   │ S3 (attachments)│
└───────────────┘   └──────────────┘
```

### 2.1 Architectural Style
- **Start as a Modular Monolith** (single Spring Boot deployable, cleanly separated Java modules/packages by domain: `project`, `issue`, `workflow`, `board`, `sprint`, `search`, `notification`, `admin`, `auth`). This is the pragmatic enterprise choice for a v1 — avoids premature microservices overhead while keeping module boundaries clean enough to extract services later (Search, Notifications, Webhooks are the first natural extraction candidates and are shown as separate services above because they benefit from independent scaling and async processing from day one).
- Each module exposes a clear internal API (Java interfaces) and owns its own database schema/tables — no cross-module direct SQL joins — to preserve the ability to split into microservices later without a rewrite.

## 3. Multi-Tenancy Strategy

**Approach: Shared database, shared schema, discriminator column (`tenant_id`) + Row-Level Security (RLS) in PostgreSQL.**

Rationale: Best balance of operational simplicity (one DB to manage/back up/migrate) and strong isolation guarantees (Postgres RLS enforces tenant isolation at the database engine level, not just application code, so an application bug can't leak cross-tenant data).

- Every table containing tenant data has a `tenant_id UUID NOT NULL` column.
- PostgreSQL RLS policies enforce `tenant_id = current_setting('app.current_tenant')::uuid` on every query.
- The API layer sets `app.current_tenant` via a Spring `Filter`/interceptor at the start of every request, derived from the authenticated JWT's tenant claim.
- Large Enterprise-tier customers may be migrated to **dedicated schema-per-tenant** or **dedicated database-per-tenant** as a scale/compliance escape hatch — architecture supports this via a `TenantDataSourceRouter` abstraction from day one, even if unused in v1.

## 4. Core Domain Model (Simplified ER Overview)

```
Organization (tenant) 1─* Project 1─* Issue *─* Issue (links)
Project 1─* Board
Project 1─* Sprint
Project 1─* WorkflowScheme 1─* Workflow 1─* Status/Transition
Issue 1─* Comment
Issue 1─* Attachment
Issue *─1 IssueType
Issue *─1 User (assignee, reporter)
Organization 1─* User (via Membership, *─* with Role)
Role 1─* Permission
Project 1─* ProjectRole (per-project override)
Organization 1─* CustomFieldDefinition *─* Project
Organization 1─* AuditLogEntry
```

Key tables (non-exhaustive): `organizations`, `users`, `memberships`, `roles`, `permissions`, `projects`, `project_roles`, `issue_types`, `issues`, `issue_links`, `comments`, `attachments`, `workflows`, `workflow_statuses`, `workflow_transitions`, `boards`, `sprints`, `custom_fields`, `custom_field_values`, `notifications`, `audit_log`, `webhooks`.

## 5. API Design

- **Style:** REST (JSON), versioned at `/api/v1/...`.
- Resource-oriented: `/api/v1/projects/{projectId}/issues/{issueId}`.
- Pagination: cursor-based for large collections (`?cursor=...&limit=50`).
- Filtering: TQL query param for issue search (`/api/v1/search?tql=...`).
- Consistent error envelope: `{ "error": { "code": "...", "message": "...", "traceId": "..." } }`.
- API documented via OpenAPI 3.0 (springdoc-openapi), auto-generated Swagger UI at `/api/docs`.
- Rate limiting per tenant/API-token via Redis token bucket at the gateway.
- **Real-time:** WebSocket channel per board (`/ws/board/{boardId}`) broadcasting issue-moved, issue-updated, comment-added events so multiple users see live updates without polling.

## 6. Deployment & Environments

- **Environments:** `dev` → `staging` → `production`, each isolated K8s namespace/cluster.
- **Infrastructure as Code:** Terraform for cloud resources (VPC, RDS/Aurora Postgres, Elasticsearch, MSK/Kafka, S3, EKS).
- **CI/CD Pipeline:** On PR — lint, unit tests, build. On merge to `main` — build image, push to registry, deploy to staging, run integration/e2e tests, manual gate → promote to production (blue/green or rolling deploy).
- **Database migrations:** Flyway (Java-side, versioned SQL migration files), run automatically as a pre-deploy step.

## 7. Scalability & Performance Strategy
- Stateless API service instances behind a load balancer → horizontal pod autoscaling on CPU/RPS.
- Read-heavy endpoints (board data, dashboards) cached in Redis with short TTL + event-driven invalidation on writes.
- Search/reporting queries routed to Elasticsearch read replica, never hitting primary Postgres for full-text scans.
- Database connection pooling via HikariCP; read replicas for reporting-heavy queries at Enterprise scale.
- Large tenants (10M+ issues) supported via Postgres table partitioning on `tenant_id` for the `issues` and `audit_log` tables.

## 8. Suggested Repository Structure

```
/trackforge
  /backend
    /trackforge-api        (Spring Boot modular monolith)
      /src/main/java/io/trackforge/
        /project /issue /workflow /board /sprint
        /search /notification /webhook /admin /auth /common
    /trackforge-search-service   (extractable service, optional at v1)
    /trackforge-notification-service
  /frontend
    /trackforge-app         (React + TS + Vite SPA)
  /infra
    /terraform
    /k8s
  /docs
    (these 5 documents + OpenAPI spec)
```

## 9. Why This Architecture Fits an AI-Assisted (Windsurf) Build
- Clear module boundaries let Windsurf generate/modify one domain module at a time without cross-contamination.
- The Feature Ticket List (Doc 5) is decomposed to map 1:1 onto this module structure, so each ticket corresponds to a bounded set of files.
- OpenAPI-first contract between frontend/backend allows frontend and backend tickets to be built in parallel with a shared, generated TypeScript API client (`openapi-typescript-codegen`).
