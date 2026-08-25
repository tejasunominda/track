package io.trackforge.issue.dto.admin;

import io.trackforge.issue.model.StatusCategory;
import java.util.UUID;

public record IssueStatusDto(UUID id, String name, StatusCategory statusCategory) {
}
