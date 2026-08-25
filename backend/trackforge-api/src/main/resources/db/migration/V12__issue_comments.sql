-- V12__issue_comments.sql
-- Phase 1: issue comments (F5-03).

CREATE TABLE issue_comments (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES organizations(id),
    issue_id    UUID NOT NULL REFERENCES issues(id),
    author_id   UUID NOT NULL REFERENCES users(id),
    body        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_issue_comments_issue ON issue_comments(tenant_id, issue_id, created_at);

ALTER TABLE issue_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_issue_comments ON issue_comments
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
