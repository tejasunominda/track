-- V2__refresh_tokens.sql
-- Backs Feature Ticket [F2-01] (JWT issuance + refresh token rotation) and
-- Security & Access Document §2.1.

CREATE TABLE refresh_tokens (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL REFERENCES organizations(id),
    user_id             UUID NOT NULL REFERENCES users(id),
    token_hash          VARCHAR(128) NOT NULL UNIQUE,
    device_fingerprint  VARCHAR(255),
    expires_at          TIMESTAMPTZ NOT NULL,
    revoked_at          TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(tenant_id, user_id);

ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_refresh_tokens ON refresh_tokens
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
