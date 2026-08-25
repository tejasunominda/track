package io.trackforge.sprint.service;

import io.trackforge.common.exception.ConflictException;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.project.repository.ProjectRepository;
import io.trackforge.sprint.dto.CreateSprintRequest;
import io.trackforge.sprint.dto.SprintResponse;
import io.trackforge.sprint.model.Sprint;
import io.trackforge.sprint.model.SprintStatus;
import io.trackforge.sprint.repository.SprintRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SprintService {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final IssueRepository issueRepository;

    public SprintService(SprintRepository sprintRepository, ProjectRepository projectRepository, IssueRepository issueRepository) {
        this.sprintRepository = sprintRepository;
        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
    }

    @Transactional
    public SprintResponse createSprint(CreateSprintRequest request) {
        TrackForgePrincipal principal = currentPrincipal();
        if (!projectRepository.existsById(request.projectId())) {
            throw new NotFoundException("PROJECT_NOT_FOUND", "Project not found.");
        }

        Sprint sprint = new Sprint(principal.tenantId(), request.projectId(), request.name());
        sprint.setGoal(request.goal());
        sprint.setStartDate(request.startDate());
        sprint.setEndDate(request.endDate());

        return toResponse(sprintRepository.save(sprint));
    }

    @Transactional(readOnly = true)
    public List<SprintResponse> listSprints(UUID projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new NotFoundException("PROJECT_NOT_FOUND", "Project not found.");
        }
        return sprintRepository.findByProjectIdOrderByStartDateAsc(projectId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public SprintResponse startSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException("SPRINT_NOT_FOUND", "Sprint not found."));
        sprintRepository.findByProjectIdAndStatus(sprint.getProjectId(), SprintStatus.ACTIVE)
                .ifPresent(active -> {
                    throw new ConflictException("ALREADY_ACTIVE_SPRINT", "Another sprint is already active for this project.");
                });
        sprint.setStatus(SprintStatus.ACTIVE);
        return toResponse(sprintRepository.save(sprint));
    }

    @Transactional
    public SprintResponse completeSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException("SPRINT_NOT_FOUND", "Sprint not found."));
        if (sprint.getStatus() != SprintStatus.ACTIVE) {
            throw new ConflictException("SPRINT_NOT_ACTIVE", "Sprint is not active.");
        }
        // Incomplete issues roll back to backlog (clear sprint_id, keep status).
        issueRepository.findByProjectIdAndStatusIdIn(sprint.getProjectId(),
                        List.of(getStatusIdByName("In Progress").orElse(null), getStatusIdByName("To Do").orElse(null)))
                .stream()
                .filter(i -> i.getSprintId() != null && i.getSprintId().equals(sprintId))
                .forEach(i -> i.setSprintId(null));
        sprint.setStatus(SprintStatus.COMPLETED);
        return toResponse(sprintRepository.save(sprint));
    }

    // Stub: in a real implementation this would require the IssueStatus repository.
    private java.util.Optional<UUID> getStatusIdByName(String name) {
        return java.util.Optional.empty();
    }

    private SprintResponse toResponse(Sprint sprint) {
        return new SprintResponse(
                sprint.getId(),
                sprint.getProjectId(),
                sprint.getName(),
                sprint.getGoal(),
                sprint.getStatus(),
                sprint.getStartDate(),
                sprint.getEndDate(),
                sprint.getCreatedAt());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
