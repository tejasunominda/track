package io.trackforge.issue.dto.admin;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record WorkflowSchemeDto(
        UUID id,
        @NotNull UUID projectId,
        @NotNull UUID issueTypeId,
        @NotNull UUID workflowId) {
}
