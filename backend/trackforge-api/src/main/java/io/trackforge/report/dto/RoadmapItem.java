package io.trackforge.report.dto;

import java.time.Instant;
import java.util.UUID;

public record RoadmapItem(
        UUID issueId,
        String issueKey,
        String summary,
        UUID projectId,
        String projectName,
        String status,
        Instant start,
        Instant end) {
}
