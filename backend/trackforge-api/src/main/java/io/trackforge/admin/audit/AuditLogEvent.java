package io.trackforge.admin.audit;

import java.time.Instant;
import java.util.UUID;

public record AuditLogEvent(
        UUID tenantId,
        UUID actorUserId,
        String action,
        String entityType,
        UUID entityId,
        String beforeState,
        String afterState,
        String ipAddress,
        String userAgent,
        Instant timestamp) {
}
