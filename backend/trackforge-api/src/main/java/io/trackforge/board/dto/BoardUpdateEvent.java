package io.trackforge.board.dto;

import io.trackforge.issue.dto.IssueSummaryResponse;
import java.util.UUID;

public record BoardUpdateEvent(
        UUID projectId,
        String eventType,
        IssueSummaryResponse issue) {
}
