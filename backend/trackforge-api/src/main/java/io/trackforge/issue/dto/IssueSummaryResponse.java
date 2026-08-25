package io.trackforge.issue.dto;

import java.time.Instant;
import java.util.UUID;

public record IssueSummaryResponse(
        UUID id,
        UUID projectId,
        String issueTypeName,
        String statusName,
        String statusCategory,
        String summary,
        String description,
        UUID reporterId,
        UUID assigneeId,
        String priority,
        Integer storyPoints,
        Instant createdAt,
        Instant updatedAt) {
}
