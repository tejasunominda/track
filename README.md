# TrackForge

Enterprise-grade project management & issue-tracking platform (Jira-class), built as a multi-tenant SaaS.

This repository follows the structure defined in [`docs/02-Technical-Architecture-Document.md`](docs/02-Technical-Architecture-Document.md) §8.

## Repository Layout

```
trackforge/
  backend/                     # Java 21 / Spring Boot 3 services
    trackforge-api/            # Modular monolith (Projects, Issues, Workflows, Boards, Sprints, Auth, Admin, ...)
    trackforge-search-service/ # Extractable service (Elasticsearch) — Phase 2
    trackforge-notification-service/ # Extractable service (async notifications) — Phase 2
  frontend/
    trackforge-app/            # React 18 + TypeScript + Vite SPA
  infra/
    terraform/                 # IaC: VPC, RDS, EKS, Elasticsearch, Kafka, S3
    k8s/                       # Kubernetes manifests (base + per-env overlays)
  docs/                        # Product/Architecture/Security/Frontend/Ticket docs (source of truth)
  docker-compose.yml           # Local dev: Postgres, Redis, backend, frontend
```

## Documentation

Read in order before contributing:
1. [Product Requirements Document](docs/01-Product-Requirements-Document.md)
2. [Technical Architecture Document](docs/02-Technical-Architecture-Document.md)
3. [Security & Access Document](docs/03-Security-Access-Document.md)
4. [Frontend Specification Document](docs/04-Frontend-Specification-Document.md)
5. [Feature Ticket List](docs/05-Feature-Ticket-List.md)

## Local Development

```bash
docker compose up -d postgres redis
cd backend/trackforge-api && ./mvnw spring-boot:run
cd frontend/trackforge-app && npm install && npm run dev
```

Or run everything (backend + frontend included) via:

```bash
docker compose up --build
```

- Backend API: http://localhost:8080/api/v1
- Swagger UI: http://localhost:8080/api/docs
- Frontend: http://localhost:5173

## Tech Stack

See [Technical Architecture Document §1](docs/02-Technical-Architecture-Document.md#1-technology-stack-decision) for full rationale.

| Layer | Technology |
|---|---|
| Backend | Java 21, Spring Boot 3, Spring Security, Spring Data JPA, PostgreSQL, Flyway |
| Frontend | React 18, TypeScript, Vite, TanStack Query/Table, Zustand, Tailwind CSS, shadcn/ui |
| Infra | Docker, Kubernetes, Terraform, Kafka, Redis, Elasticsearch, S3 |
