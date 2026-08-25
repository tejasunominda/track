-- V8__notifications.sql
-- Feature Tickets [F8-01], [F8-02], [F8-04]: notification event storage.

CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES organizations(id),
    user_id         UUID NOT NULL REFERENCES users(id),
    event_type      VARCHAR(64) NOT NULL, -- ISSUE_CREATED, ISSUE_ASSIGNED, SPRINT_STARTED, etc.
    entity_type     VARCHAR(64),
    entity_id       UUID,
    title           VARCHAR(255) NOT NULL,
    body            TEXT,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_unread ON notifications(tenant_id, user_id, read_at);
CREATE INDEX idx_notifications_created ON notifications(tenant_id, user_id, created_at);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_notifications ON notifications
    USING (tenant_id = current_setting('app.current_tenant', true)::uuid);
