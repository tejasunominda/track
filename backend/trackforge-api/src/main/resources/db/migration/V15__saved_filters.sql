-- V15__saved_filters.sql
-- Phase 3: saved TQL filters.

CREATE TABLE saved_filters (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    created_by      UUID NOT NULL REFERENCES users(id),
    name            VARCHAR(255) NOT NULL,
    query           TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_saved_filters_tenant ON saved_filters(tenant_id, created_by);

ALTER TABLE saved_filters ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_saved_filters ON saved_filters
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
