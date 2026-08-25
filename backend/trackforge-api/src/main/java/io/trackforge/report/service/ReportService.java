package io.trackforge.report.service;

import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.StatusCategory;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.project.repository.ProjectRepository;
import io.trackforge.report.dto.BurndownResponse;
import io.trackforge.report.dto.VelocityResponse;
import io.trackforge.sprint.model.Sprint;
import io.trackforge.sprint.model.SprintStatus;
import io.trackforge.sprint.repository.SprintRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    private final IssueRepository issueRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;

    public ReportService(
            IssueRepository issueRepository,
            IssueStatusRepository issueStatusRepository,
            SprintRepository sprintRepository,
            ProjectRepository projectRepository) {
        this.issueRepository = issueRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.sprintRepository = sprintRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public BurndownResponse burndownForSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException("SPRINT_NOT_FOUND", "Sprint not found."));
        List<Issue> issues = issueRepository.findByProjectIdOrderByRankAsc(sprint.getProjectId()).stream()
                .filter(i -> sprintId.equals(i.getSprintId()))
                .toList();

        List<UUID> statusIds = issues.stream().map(Issue::getStatusId).distinct().toList();
        Map<UUID, StatusCategory> categories = issueStatusRepository.findAllById(statusIds).stream()
                .collect(Collectors.toMap(IssueStatus::getId, IssueStatus::getStatusCategory));

        long total = sumStoryPoints(issues);
        long completed = issues.stream()
                .filter(i -> categories.getOrDefault(i.getStatusId(), StatusCategory.TODO) == StatusCategory.DONE)
                .mapToLong(i -> i.getStoryPoints() != null ? i.getStoryPoints() : 0)
                .sum();
        long remaining = total - completed;

        return new BurndownResponse(total, remaining, completed);
    }

    @Transactional(readOnly = true)
    public List<VelocityResponse> velocityBySprint(UUID projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new NotFoundException("PROJECT_NOT_FOUND", "Project not found.");
        }

        List<Sprint> sprints = sprintRepository.findByProjectIdOrderByStartDateAsc(projectId).stream()
                .filter(s -> s.getStatus() == SprintStatus.COMPLETED)
                .toList();

        List<Issue> issues = issueRepository.findByProjectIdOrderByRankAsc(projectId);
        List<UUID> statusIds = issues.stream().map(Issue::getStatusId).distinct().toList();
        Map<UUID, StatusCategory> categories = issueStatusRepository.findAllById(statusIds).stream()
                .collect(Collectors.toMap(IssueStatus::getId, IssueStatus::getStatusCategory));

        List<VelocityResponse> result = new ArrayList<>();
        for (Sprint sprint : sprints) {
            List<Issue> sprintIssues = issues.stream()
                    .filter(i -> sprint.getId().equals(i.getSprintId()))
                    .toList();
            long committed = sumStoryPoints(sprintIssues);
            long completed = sprintIssues.stream()
                    .filter(i -> categories.getOrDefault(i.getStatusId(), StatusCategory.TODO) == StatusCategory.DONE)
                    .mapToLong(i -> i.getStoryPoints() != null ? i.getStoryPoints() : 0)
                    .sum();
            result.add(new VelocityResponse(sprint.getId(), sprint.getName(), committed, completed));
        }
        return result;
    }

    private long sumStoryPoints(List<Issue> issues) {
        return issues.stream().mapToLong(i -> i.getStoryPoints() != null ? i.getStoryPoints() : 0).sum();
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
