package io.trackforge.report.dto;

import java.util.UUID;

public record VelocityResponse(
        UUID sprintId,
        String sprintName,
        long committed,
        long completed) {
}
