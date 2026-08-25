-- V14__issue_links.sql
-- Phase 1: issue linking and sub-task hierarchy.

CREATE TABLE issue_links (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    source_id       UUID NOT NULL REFERENCES issues(id),
    target_id       UUID NOT NULL REFERENCES issues(id),
    link_type       VARCHAR(32) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, source_id, target_id, link_type)
);

CREATE INDEX idx_issue_links_source ON issue_links(tenant_id, source_id);
CREATE INDEX idx_issue_links_target ON issue_links(tenant_id, target_id);

ALTER TABLE issue_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_issue_links ON issue_links
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
