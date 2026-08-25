package io.trackforge.board.dto;

import io.trackforge.issue.dto.IssueSummaryResponse;
import java.util.List;
import java.util.UUID;

public record BoardStateResponse(
        UUID projectId,
        String projectName,
        List<BoardColumnResponse> columns) {

    public record BoardColumnResponse(
            UUID statusId,
            String statusName,
            String statusCategory,
            Integer wipLimit,
            List<IssueSummaryResponse> issues) {
    }
}
