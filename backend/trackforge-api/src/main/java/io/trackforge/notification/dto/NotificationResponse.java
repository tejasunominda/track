package io.trackforge.notification.dto;

import java.time.Instant;
import java.util.UUID;

public record NotificationResponse(
        UUID id,
        String eventType,
        String entityType,
        UUID entityId,
        String title,
        String body,
        boolean read,
        Instant createdAt) {
}
