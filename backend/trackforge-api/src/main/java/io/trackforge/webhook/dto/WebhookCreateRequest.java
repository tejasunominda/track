package io.trackforge.webhook.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record WebhookCreateRequest(
        @NotBlank(message = "is required") String name,
        @NotBlank(message = "is required") String url,
        @NotEmpty(message = "must subscribe to at least one event") List<String> events,
        String secret) {
}
