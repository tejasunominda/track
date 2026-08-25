package io.trackforge.issue.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.UUID;

public record IssueCommentDto(
        UUID id,
        UUID issueId,
        UUID authorId,
        String authorName,
        @NotBlank String body,
        Instant createdAt,
        Instant updatedAt) {
}
