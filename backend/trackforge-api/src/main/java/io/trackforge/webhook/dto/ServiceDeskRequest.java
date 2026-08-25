package io.trackforge.webhook.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record ServiceDeskRequest(
        @NotNull UUID projectId,
        @NotBlank String summary,
        String description,
        String reporterEmail) {
}
