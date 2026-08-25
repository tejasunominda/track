-- V7__sprints.sql
-- Feature Ticket [F7-01]: sprint model and issue sprint assignment.

CREATE TABLE sprints (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    project_id      UUID NOT NULL REFERENCES projects(id),
    name            VARCHAR(128) NOT NULL,
    goal            TEXT,
    status          VARCHAR(32) NOT NULL DEFAULT 'FUTURE', -- FUTURE, ACTIVE, COMPLETED
    start_date      DATE,
    end_date        DATE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sprints_project_status ON sprints(tenant_id, project_id, status);

ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_sprints ON sprints
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
