package io.trackforge.webhook.dto;

import java.util.List;
import java.util.UUID;

public record WebhookDto(UUID id, String name, String url, List<String> events) {
}
