-- V5__workflows.sql
-- Feature Ticket [F4-04]: workflow model (statuses, transitions, schemes).

CREATE TABLE issue_types (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    name            VARCHAR(64) NOT NULL,
    description     TEXT,
    hierarchy_level INT NOT NULL DEFAULT 1,
    icon            VARCHAR(64),
    color           VARCHAR(32),
    UNIQUE (tenant_id, name)
);

CREATE TABLE issue_statuses (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES organizations(id),
    name                VARCHAR(64) NOT NULL,
    status_category     VARCHAR(32) NOT NULL,
    UNIQUE (tenant_id, name)
);

CREATE TABLE workflows (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES organizations(id),
    project_id  UUID REFERENCES projects(id),
    name        VARCHAR(128) NOT NULL
);

CREATE TABLE workflow_transitions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES organizations(id),
    workflow_id         UUID NOT NULL REFERENCES workflows(id),
    from_status_id      UUID NOT NULL REFERENCES issue_statuses(id),
    to_status_id        UUID NOT NULL REFERENCES issue_statuses(id),
    conditions_json     TEXT DEFAULT '{}',
    validators_json     TEXT DEFAULT '{}',
    post_functions_json TEXT DEFAULT '{}',
    UNIQUE (tenant_id, workflow_id, from_status_id, to_status_id)
);

CREATE TABLE workflow_schemes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    project_id      UUID NOT NULL REFERENCES projects(id),
    issue_type_id   UUID NOT NULL REFERENCES issue_types(id),
    workflow_id     UUID NOT NULL REFERENCES workflows(id),
    UNIQUE (tenant_id, project_id, issue_type_id)
);

CREATE INDEX idx_workflow_transitions_workflow ON workflow_transitions(workflow_id);

ALTER TABLE issue_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_transitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_issue_types ON issue_types
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
CREATE POLICY tenant_isolation_issue_statuses ON issue_statuses
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
CREATE POLICY tenant_isolation_workflows ON workflows
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
CREATE POLICY tenant_isolation_workflow_transitions ON workflow_transitions
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
CREATE POLICY tenant_isolation_workflow_schemes ON workflow_schemes
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
