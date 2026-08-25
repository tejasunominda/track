-- V3__projects.sql
-- Feature Ticket [F3-01]. Tenant-scoped projects with Row-Level Security.

CREATE TABLE projects (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES organizations(id),
    name                VARCHAR(255) NOT NULL,
    project_key         VARCHAR(32) UNIQUE,
    description         TEXT,
    template            VARCHAR(32) NOT NULL,
    status              VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    lead_user_id        UUID REFERENCES users(id),
    default_assignee_id UUID REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_tenant_status ON projects(tenant_id, status);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_projects ON projects
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
