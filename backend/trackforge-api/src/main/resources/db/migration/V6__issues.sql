-- V6__issues.sql
-- Feature Ticket [F5-01]: core issue entity (PRD §4.2).

CREATE TABLE issues (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES organizations(id),
    project_id          UUID NOT NULL REFERENCES projects(id),
    issue_type_id       UUID NOT NULL REFERENCES issue_types(id),
    status_id           UUID NOT NULL REFERENCES issue_statuses(id),
    parent_id           UUID REFERENCES issues(id),
    summary             VARCHAR(255) NOT NULL,
    description         TEXT,
    reporter_id         UUID NOT NULL REFERENCES users(id),
    assignee_id         UUID REFERENCES users(id),
    priority            VARCHAR(32),
    labels              TEXT DEFAULT '[]',
    components          TEXT DEFAULT '[]',
    fix_version         VARCHAR(128),
    story_points        INT,
    due_date            DATE,
    rank                VARCHAR(64), -- LexoRank / ordered string for backlog
    custom_field_values TEXT DEFAULT '{}',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_issues_tenant_project ON issues(tenant_id, project_id);
CREATE INDEX idx_issues_status ON issues(tenant_id, project_id, status_id);
CREATE INDEX idx_issues_rank ON issues(tenant_id, project_id, rank);

ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_issues ON issues
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
