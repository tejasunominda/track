-- V9__dashboards.sql
-- Feature Tickets [F12-01]..[F12-04]: dashboard and widget storage.

CREATE TABLE dashboards (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES organizations(id),
    name        VARCHAR(128) NOT NULL,
    widgets     TEXT DEFAULT '[]', -- JSON array of widget configs
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dashboards_tenant ON dashboards(tenant_id);

ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_dashboards ON dashboards
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
