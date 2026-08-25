package io.trackforge.issue.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record CreateIssueRequest(
        @NotNull(message = "is required") UUID projectId,
        @NotNull(message = "is required") UUID issueTypeId,
        @NotBlank(message = "is required") String summary,
        String description,
        UUID assigneeId,
        String priority,
        Integer storyPoints) {
}
