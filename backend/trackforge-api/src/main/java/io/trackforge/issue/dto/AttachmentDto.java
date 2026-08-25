package io.trackforge.issue.dto;

import java.time.Instant;
import java.util.UUID;

public record AttachmentDto(
        UUID id,
        UUID issueId,
        UUID uploadedBy,
        String fileName,
        String contentType,
        long sizeBytes,
        String scanStatus,
        String downloadUrl,
        Instant createdAt) {
}
