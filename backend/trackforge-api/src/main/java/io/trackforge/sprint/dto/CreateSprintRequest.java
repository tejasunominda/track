package io.trackforge.sprint.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateSprintRequest(
        @NotNull(message = "is required") java.util.UUID projectId,
        @NotBlank(message = "is required") String name,
        String goal,
        LocalDate startDate,
        LocalDate endDate) {
}
