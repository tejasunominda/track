package io.trackforge.issue.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record IssueLinkDto(
        UUID id,
        @NotNull UUID sourceId,
        @NotNull UUID targetId,
        @NotBlank String linkType,
        IssueSummaryResponse targetSummary) {
}
