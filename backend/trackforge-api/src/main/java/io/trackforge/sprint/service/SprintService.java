package io.trackforge.sprint.service;

import io.trackforge.admin.audit.AuditLogPublisher;
import io.trackforge.common.exception.ConflictException;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
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
    private final IssueStatusRepository issueStatusRepository;
    private final AuditLogPublisher auditLogPublisher;
    private final io.trackforge.webhook.service.WebhookDispatcher webhookDispatcher;

    public SprintService(SprintRepository sprintRepository, ProjectRepository projectRepository, IssueRepository issueRepository,
                         IssueStatusRepository issueStatusRepository, AuditLogPublisher auditLogPublisher,
                         io.trackforge.webhook.service.WebhookDispatcher webhookDispatcher) {
        this.sprintRepository = sprintRepository;
        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.auditLogPublisher = auditLogPublisher;
        this.webhookDispatcher = webhookDispatcher;
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

        Sprint saved = sprintRepository.save(sprint);
        auditLogPublisher.emit(saved.getTenantId(), principal.userId(), "CREATE", "Sprint", saved.getId(), null, toResponse(saved));
        return toResponse(saved);
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
        TrackForgePrincipal principal = currentPrincipal();
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException("SPRINT_NOT_FOUND", "Sprint not found."));
        sprintRepository.findByProjectIdAndStatus(sprint.getProjectId(), SprintStatus.ACTIVE)
                .ifPresent(active -> {
                    throw new ConflictException("ALREADY_ACTIVE_SPRINT", "Another sprint is already active for this project.");
                });
        Sprint before = copy(sprint);
        sprint.setStatus(SprintStatus.ACTIVE);
        Sprint saved = sprintRepository.save(sprint);
        SprintResponse response = toResponse(saved);
        auditLogPublisher.emit(saved.getTenantId(), principal.userId(), "START", "Sprint", saved.getId(), toResponse(before), response);
        webhookDispatcher.dispatch("sprint.started", "Sprint", saved.getId(), response);
        return response;
    }

    @Transactional
    public SprintResponse completeSprint(UUID sprintId) {
        TrackForgePrincipal principal = currentPrincipal();
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException("SPRINT_NOT_FOUND", "Sprint not found."));
        if (sprint.getStatus() != SprintStatus.ACTIVE) {
            throw new ConflictException("SPRINT_NOT_ACTIVE", "Sprint is not active.");
        }
        // Incomplete issues roll back to backlog (clear sprint_id, keep status).
        List<UUID> openStatusIds = List.of(
                getStatusIdByName("In Progress").orElse(null),
                getStatusIdByName("To Do").orElse(null))
                .stream().filter(java.util.Objects::nonNull).toList();
        if (!openStatusIds.isEmpty()) {
            issueRepository.findByProjectIdAndStatusIdIn(sprint.getProjectId(), openStatusIds).stream()
                    .filter(i -> i.getSprintId() != null && i.getSprintId().equals(sprintId))
                    .forEach(i -> i.setSprintId(null));
        }
        Sprint before = copy(sprint);
        sprint.setStatus(SprintStatus.COMPLETED);
        Sprint saved = sprintRepository.save(sprint);
        SprintResponse response = toResponse(saved);
        auditLogPublisher.emit(saved.getTenantId(), principal.userId(), "COMPLETE", "Sprint", saved.getId(), toResponse(before), response);
        webhookDispatcher.dispatch("sprint.completed", "Sprint", saved.getId(), response);
        return response;
    }

    private java.util.Optional<UUID> getStatusIdByName(String name) {
        return issueStatusRepository.findByNameIgnoreCase(name).map(IssueStatus::getId);
    }

    private Sprint copy(Sprint src) {
        Sprint c = new Sprint(src.getTenantId(), src.getProjectId(), src.getName());
        c.setId(src.getId());
        c.setGoal(src.getGoal());
        c.setStatus(src.getStatus());
        c.setStartDate(src.getStartDate());
        c.setEndDate(src.getEndDate());
        c.setCreatedAt(src.getCreatedAt());
        return c;
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
