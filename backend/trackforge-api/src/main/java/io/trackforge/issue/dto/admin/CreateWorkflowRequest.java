package io.trackforge.issue.dto.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

public record CreateWorkflowRequest(
        UUID projectId,
        @NotBlank String name,
        @NotNull List<TransitionSpec> transitions) {

    public record TransitionSpec(
            @NotNull UUID fromStatusId,
            @NotNull UUID toStatusId) {
    }
}
