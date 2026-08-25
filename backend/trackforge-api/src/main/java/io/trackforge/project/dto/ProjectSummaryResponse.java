package io.trackforge.project.dto;

import io.trackforge.project.model.ProjectStatus;
import io.trackforge.project.model.ProjectTemplate;
import java.time.Instant;
import java.util.UUID;

public record ProjectSummaryResponse(
        UUID id,
        String name,
        String projectKey,
        String description,
        ProjectTemplate template,
        ProjectStatus status,
        Instant createdAt,
        Instant updatedAt) {
}
