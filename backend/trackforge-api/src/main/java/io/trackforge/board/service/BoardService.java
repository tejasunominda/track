package io.trackforge.board.service;

import io.trackforge.board.dto.BoardStateResponse;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.WorkflowRepository;
import io.trackforge.project.model.Project;
import io.trackforge.project.repository.ProjectRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardService {

    private final ProjectRepository projectRepository;
    private final IssueRepository issueRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final WorkflowRepository workflowRepository;

    public BoardService(
            ProjectRepository projectRepository,
            IssueRepository issueRepository,
            IssueStatusRepository issueStatusRepository,
            WorkflowRepository workflowRepository) {
        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.workflowRepository = workflowRepository;
    }

    @Transactional(readOnly = true)
    public BoardStateResponse getBoard(UUID projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("PROJECT_NOT_FOUND", "Project not found."));

        List<Issue> issues = issueRepository.findByProjectIdOrderByRankAsc(projectId);
        Map<UUID, List<Issue>> byStatus = issues.stream().collect(Collectors.groupingBy(Issue::getStatusId));

        List<UUID> statusIds = new ArrayList<>(byStatus.keySet());
        List<IssueStatus> statuses = issueStatusRepository.findAllById(statusIds);

        List<BoardStateResponse.BoardColumnResponse> columns = statuses.stream()
                .sorted((a, b) -> a.getStatusCategory().name().compareTo(b.getStatusCategory().name()))
                .map(status -> new BoardStateResponse.BoardColumnResponse(
                        status.getId(),
                        status.getName(),
                        status.getStatusCategory().name(),
                        null,
                        byStatus.getOrDefault(status.getId(), List.of()).stream()
                                .map(this::toIssueSummary)
                                .toList()))
                .toList();

        return new BoardStateResponse(projectId, project.getName(), columns);
    }

    private IssueSummaryResponse toIssueSummary(Issue issue) {
        // Minimal mapping; full mapping would need type/status lookups.
        return new IssueSummaryResponse(
                issue.getId(),
                issue.getProjectId(),
                null,
                null,
                null,
                issue.getSummary(),
                issue.getDescription(),
                issue.getReporterId(),
                issue.getAssigneeId(),
                issue.getPriority(),
                issue.getStoryPoints(),
                issue.getCreatedAt(),
                issue.getUpdatedAt());
    }
}
