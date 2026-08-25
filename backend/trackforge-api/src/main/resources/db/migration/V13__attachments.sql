-- V13__attachments.sql
-- Phase 1: issue attachments.

CREATE TABLE attachments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    issue_id        UUID NOT NULL REFERENCES issues(id),
    uploaded_by     UUID NOT NULL REFERENCES users(id),
    file_name       VARCHAR(255) NOT NULL,
    content_type    VARCHAR(128),
    storage_path    VARCHAR(512) NOT NULL,
    size_bytes      BIGINT,
    scan_status     VARCHAR(32) NOT NULL DEFAULT 'PENDING', -- PENDING, CLEAN, INFECTED
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_attachments_issue ON attachments(tenant_id, issue_id);

ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_attachments ON attachments
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
