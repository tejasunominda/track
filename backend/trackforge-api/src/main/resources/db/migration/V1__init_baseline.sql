-- V1__init_baseline.sql
-- Baseline schema per Feature Ticket [F1-02] and Technical Architecture Document §4.
-- Establishes the core multi-tenant identity tables. Subsequent modules (project,
-- issue, workflow, board, sprint, ...) add their own versioned migrations here.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE organizations (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(255) NOT NULL,
    subdomain     VARCHAR(63) NOT NULL UNIQUE,
    tier          VARCHAR(32) NOT NULL DEFAULT 'FREE',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255),
    display_name    VARCHAR(255) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE memberships (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    user_id         UUID NOT NULL REFERENCES users(id),
    org_role        VARCHAR(32) NOT NULL DEFAULT 'ORG_MEMBER',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, user_id)
);

-- Row-Level Security is enabled per-table as tenant-scoped tables are introduced.
-- See Feature Ticket [F1-03] and Security & Access Document §3.2/§6.
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_memberships ON memberships
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
