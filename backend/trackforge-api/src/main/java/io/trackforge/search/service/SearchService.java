package io.trackforge.search.service;

import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import io.trackforge.project.dto.ProjectSummaryResponse;
import io.trackforge.project.model.Project;
import io.trackforge.project.repository.ProjectRepository;
import io.trackforge.search.dto.SearchResult;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SearchService {

    private final ProjectRepository projectRepository;
    private final IssueRepository issueRepository;
    private final IssueTypeRepository issueTypeRepository;
    private final IssueStatusRepository issueStatusRepository;

    public SearchService(
            ProjectRepository projectRepository,
            IssueRepository issueRepository,
            IssueTypeRepository issueTypeRepository,
            IssueStatusRepository issueStatusRepository) {
        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
        this.issueTypeRepository = issueTypeRepository;
        this.issueStatusRepository = issueStatusRepository;
    }

    @Transactional(readOnly = true)
    public SearchResult keywordSearch(String query) {
        List<Project> projects = projectRepository.findByStatusOrderByNameAsc(io.trackforge.project.model.ProjectStatus.ACTIVE).stream()
                .filter(p -> contains(p.getName(), query) || contains(p.getDescription(), query))
                .toList();

        List<Issue> issues = issueRepository.findAll().stream()
                .filter(i -> contains(i.getSummary(), query) || contains(i.getDescription(), query))
                .toList();

        List<UUID> statusIds = issues.stream().map(Issue::getStatusId).distinct().toList();
        List<UUID> typeIds = issues.stream().map(Issue::getIssueTypeId).distinct().toList();
        Map<UUID, IssueStatus> statuses = issueStatusRepository.findAllById(statusIds).stream()
                .collect(Collectors.toMap(IssueStatus::getId, s -> s));
        Map<UUID, IssueType> types = issueTypeRepository.findAllById(typeIds).stream()
                .collect(Collectors.toMap(IssueType::getId, t -> t));

        return new SearchResult(
                projects.stream().map(this::toProjectSummary).toList(),
                issues.stream().map(i -> toIssueSummary(i, types.get(i.getIssueTypeId()), statuses.get(i.getStatusId()))).toList());
    }

    private boolean contains(String value, String query) {
        return value != null && value.toLowerCase().contains(query.toLowerCase());
    }

    private ProjectSummaryResponse toProjectSummary(Project p) {
        return new ProjectSummaryResponse(
                p.getId(), p.getName(), p.getProjectKey(), p.getDescription(),
                p.getTemplate(), p.getStatus(), p.getCreatedAt(), p.getUpdatedAt());
    }

    private IssueSummaryResponse toIssueSummary(Issue i, IssueType type, IssueStatus status) {
        return new IssueSummaryResponse(
                i.getId(), i.getProjectId(),
                type != null ? type.getName() : null,
                status != null ? status.getName() : null,
                status != null ? status.getStatusCategory().name() : null,
                i.getSummary(), i.getDescription(), i.getReporterId(),
                i.getAssigneeId(), i.getPriority(), i.getStoryPoints(),
                i.getCreatedAt(), i.getUpdatedAt());
    }
}
