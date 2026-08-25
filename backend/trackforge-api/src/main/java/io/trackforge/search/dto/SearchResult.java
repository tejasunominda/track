package io.trackforge.search.dto;

import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.project.dto.ProjectSummaryResponse;
import java.util.List;

public record SearchResult(
        List<ProjectSummaryResponse> projects,
        List<IssueSummaryResponse> issues) {
}
