package io.trackforge.issue.dto;

import java.util.UUID;

public record SubtaskSummary(UUID id, String summary, String statusName, String statusCategory) {
}
