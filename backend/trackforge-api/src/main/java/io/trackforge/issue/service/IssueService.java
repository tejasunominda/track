package io.trackforge.issue.service;

import io.trackforge.admin.audit.AuditLogPublisher;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.dto.CreateIssueRequest;
import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.dto.UpdateIssueRequest;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import io.trackforge.project.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueTypeRepository issueTypeRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final ProjectRepository projectRepository;
    private final WorkflowTransitionEngine workflowEngine;
    private final AuditLogPublisher auditLogPublisher;

    public IssueService(
            IssueRepository issueRepository,
            IssueTypeRepository issueTypeRepository,
            IssueStatusRepository issueStatusRepository,
            ProjectRepository projectRepository,
            WorkflowTransitionEngine workflowEngine,
            AuditLogPublisher auditLogPublisher) {
        this.issueRepository = issueRepository;
        this.issueTypeRepository = issueTypeRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.projectRepository = projectRepository;
        this.workflowEngine = workflowEngine;
        this.auditLogPublisher = auditLogPublisher;
    }

    @Transactional(readOnly = true)
    public List<IssueSummaryResponse> listIssuesByProject(UUID projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new NotFoundException("PROJECT_NOT_FOUND", "Project not found or access denied.");
        }
        return issueRepository.findByProjectIdOrderByRankAsc(projectId).stream()
                .map(this::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<IssueSummaryResponse> getIssue(UUID id) {
        return issueRepository.findById(id).map(this::toSummary);
    }

    @Transactional
    public IssueSummaryResponse createIssue(CreateIssueRequest request) {
        TrackForgePrincipal principal = currentPrincipal();

        IssueType issueType = issueTypeRepository.findById(request.issueTypeId())
                .orElseThrow(() -> new NotFoundException("ISSUE_TYPE_NOT_FOUND", "Issue type not found."));

        if (!projectRepository.existsById(request.projectId())) {
            throw new NotFoundException("PROJECT_NOT_FOUND", "Project not found.");
        }

        workflowEngine.getOrCreateDefaultScheme(principal.tenantId(), request.projectId(), request.issueTypeId());

        UUID initialStatusId = workflowEngine.resolveInitialStatusId(principal);

        Issue issue = new Issue(principal.tenantId(), request.projectId(), request.issueTypeId(), initialStatusId, principal.userId(), request.summary());
        issue.setDescription(request.description());
        if (request.assigneeId() != null) issue.setAssigneeId(request.assigneeId());
        if (request.priority() != null) issue.setPriority(request.priority());
        if (request.storyPoints() != null) issue.setStoryPoints(request.storyPoints());
        if (request.parentId() != null) issue.setParentId(request.parentId());

        Issue saved = issueRepository.save(issue);
        auditLogPublisher.emit(saved.getTenantId(), principal.userId(), "CREATE", "Issue", saved.getId(), null, toSummary(saved));
        return toSummary(saved);
    }

    @Transactional
    public IssueSummaryResponse updateIssue(UUID id, UpdateIssueRequest request) {
        TrackForgePrincipal principal = currentPrincipal();
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ISSUE_NOT_FOUND", "Issue not found."));

        if (request.summary() != null) issue.setSummary(request.summary());
        if (request.description() != null) issue.setDescription(request.description());
        if (request.assigneeId() != null) issue.setAssigneeId(request.assigneeId());
        if (request.priority() != null) issue.setPriority(request.priority());
        if (request.storyPoints() != null) issue.setStoryPoints(request.storyPoints());
        if (request.statusId() != null && !request.statusId().equals(issue.getStatusId())) {
            workflowEngine.requireValidTransition(issue.getProjectId(), issue.getIssueTypeId(), issue.getStatusId(), request.statusId());
            issue.setStatusId(request.statusId());
        }

        return toSummary(issueRepository.save(issue));
    }

    private IssueSummaryResponse toSummary(Issue issue) {
        IssueType type = issueTypeRepository.findById(issue.getIssueTypeId()).orElse(null);
        IssueStatus status = issueStatusRepository.findById(issue.getStatusId()).orElse(null);
        return new IssueSummaryResponse(
                issue.getId(),
                issue.getProjectId(),
                type != null ? type.getName() : null,
                status != null ? status.getName() : null,
                status != null ? status.getStatusCategory().name() : null,
                issue.getSummary(),
                issue.getDescription(),
                issue.getReporterId(),
                issue.getAssigneeId(),
                issue.getPriority(),
                issue.getStoryPoints(),
                issue.getCreatedAt(),
                issue.getUpdatedAt());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
