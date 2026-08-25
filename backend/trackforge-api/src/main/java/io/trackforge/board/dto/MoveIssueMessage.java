package io.trackforge.board.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record MoveIssueMessage(
        @NotNull UUID issueId,
        @NotNull UUID newStatusId,
        String afterIssueId) {
}
