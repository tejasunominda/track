package io.trackforge.issue.dto.admin;

import java.util.List;
import java.util.UUID;

public record WorkflowDto(UUID id, UUID projectId, String name, List<WorkflowTransitionDto> transitions) {

    public record WorkflowTransitionDto(UUID fromStatusId, String fromStatusName, UUID toStatusId, String toStatusName) {
    }
}
