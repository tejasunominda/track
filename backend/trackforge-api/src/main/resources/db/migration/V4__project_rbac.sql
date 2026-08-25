-- V4__project_rbac.sql
-- Feature Tickets [F2-02] (RBAC data model) and [F3-02] (project roles).
-- Simplified for v1: built-in org and project roles, permission strings.

CREATE TABLE permissions (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name    VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE roles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID REFERENCES organizations(id), -- NULL means global/system role
    name            VARCHAR(64) NOT NULL,
    permissions     TEXT[] NOT NULL DEFAULT '{}',
    UNIQUE (tenant_id, name)
);

CREATE TABLE project_memberships (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES organizations(id),
    project_id  UUID NOT NULL REFERENCES projects(id),
    user_id     UUID NOT NULL REFERENCES users(id),
    role_name   VARCHAR(64) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, project_id, user_id)
);

CREATE INDEX idx_project_memberships_project_user ON project_memberships(tenant_id, project_id, user_id);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_roles ON roles
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid OR tenant_id IS NULL);

CREATE POLICY tenant_isolation_project_memberships ON project_memberships
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);

-- Seed global system permissions
INSERT INTO permissions (name) VALUES
    ('CREATE_PROJECT'),
    ('ADMINISTER_PROJECT'),
    ('CREATE_ISSUE'),
    ('EDIT_ISSUE'),
    ('DELETE_ISSUE'),
    ('VIEW_PROJECT');

-- Seed built-in roles available to every tenant (tenant_id IS NULL)
INSERT INTO roles (tenant_id, name, permissions) VALUES
    (NULL, 'OrgAdmin', ARRAY['CREATE_PROJECT','ADMINISTER_PROJECT','CREATE_ISSUE','EDIT_ISSUE','DELETE_ISSUE','VIEW_PROJECT']),
    (NULL, 'ProjectAdmin', ARRAY['ADMINISTER_PROJECT','CREATE_ISSUE','EDIT_ISSUE','DELETE_ISSUE','VIEW_PROJECT']),
    (NULL, 'ProjectMember', ARRAY['CREATE_ISSUE','EDIT_ISSUE','VIEW_PROJECT']),
    (NULL, 'ProjectViewer', ARRAY['VIEW_PROJECT']);
