package io.trackforge.issue.dto;

import java.util.UUID;

public record UpdateIssueRequest(
        String summary,
        String description,
        UUID assigneeId,
        String priority,
        Integer storyPoints,
        UUID statusId) {
}
