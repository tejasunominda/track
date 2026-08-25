package io.trackforge.issue.service;

import io.trackforge.common.exception.ConflictException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.Workflow;
import io.trackforge.issue.model.WorkflowScheme;
import io.trackforge.issue.model.WorkflowTransition;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.WorkflowRepository;
import io.trackforge.issue.repository.WorkflowSchemeRepository;
import io.trackforge.issue.repository.WorkflowTransitionRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Validates and executes workflow transitions (Feature Ticket [F4-06]).
 * For v1, only the existence of a valid transition is enforced; conditions,
 * validators and post-functions are stored as JSON and parsed in Phase 2.
 */
@Service
public class WorkflowTransitionEngine {

    private final WorkflowSchemeRepository workflowSchemeRepository;
    private final WorkflowTransitionRepository workflowTransitionRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final WorkflowRepository workflowRepository;

    public WorkflowTransitionEngine(
            WorkflowSchemeRepository workflowSchemeRepository,
            WorkflowTransitionRepository workflowTransitionRepository,
            IssueStatusRepository issueStatusRepository,
            WorkflowRepository workflowRepository) {
        this.workflowSchemeRepository = workflowSchemeRepository;
        this.workflowTransitionRepository = workflowTransitionRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.workflowRepository = workflowRepository;
    }

    @Transactional
    public WorkflowScheme getOrCreateDefaultScheme(UUID tenantId, UUID projectId, UUID issueTypeId) {
        return workflowSchemeRepository.findByProjectIdAndIssueTypeId(projectId, issueTypeId)
                .orElseGet(() -> createDefaultScheme(tenantId, projectId, issueTypeId));
    }

    @Transactional
    public WorkflowScheme createDefaultScheme(UUID tenantId, UUID projectId, UUID issueTypeId) {
        IssueStatus todo = issueStatusRepository.findByNameIgnoreCase("To Do")
                .orElseThrow(() -> new IllegalStateException("No 'To Do' status found for tenant"));
        IssueStatus inProgress = issueStatusRepository.findByNameIgnoreCase("In Progress")
                .orElseThrow(() -> new IllegalStateException("No 'In Progress' status found for tenant"));
        IssueStatus done = issueStatusRepository.findByNameIgnoreCase("Done")
                .orElseThrow(() -> new IllegalStateException("No 'Done' status found for tenant"));

        Workflow workflow = workflowRepository.save(new Workflow(tenantId, projectId, "Default Workflow"));

        workflowTransitionRepository.save(new WorkflowTransition(tenantId, workflow.getId(), todo.getId(), inProgress.getId()));
        workflowTransitionRepository.save(new WorkflowTransition(tenantId, workflow.getId(), inProgress.getId(), done.getId()));
        workflowTransitionRepository.save(new WorkflowTransition(tenantId, workflow.getId(), inProgress.getId(), todo.getId()));

        return workflowSchemeRepository.save(new WorkflowScheme(tenantId, projectId, issueTypeId, workflow.getId()));
    }

    public Optional<WorkflowTransition> findTransition(UUID projectId, UUID issueTypeId, UUID fromStatusId, UUID toStatusId) {
        return workflowSchemeRepository.findByProjectIdAndIssueTypeId(projectId, issueTypeId)
                .flatMap(scheme -> workflowTransitionRepository
                        .findByWorkflowIdAndFromStatusIdAndToStatusId(scheme.getWorkflowId(), fromStatusId, toStatusId));
    }

    public void requireValidTransition(UUID projectId, UUID issueTypeId, UUID fromStatusId, UUID toStatusId) {
        if (fromStatusId.equals(toStatusId)) {
            return;
        }
        findTransition(projectId, issueTypeId, fromStatusId, toStatusId)
                .orElseThrow(() -> new ConflictException(
                        "INVALID_TRANSITION", "This workflow transition is not allowed."));
    }

    public List<IssueStatus> getValidNextStatuses(UUID projectId, UUID issueTypeId, UUID fromStatusId) {
        return workflowSchemeRepository.findByProjectIdAndIssueTypeId(projectId, issueTypeId)
                .map(WorkflowScheme::getWorkflowId)
                .map(workflowTransitionRepository::findByWorkflowId)
                .orElse(List.of())
                .stream()
                .filter(t -> t.getFromStatusId().equals(fromStatusId))
                .map(WorkflowTransition::getToStatusId)
                .map(issueStatusRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public UUID resolveInitialStatusId(TrackForgePrincipal principal) {
        return issueStatusRepository.findByNameIgnoreCase("To Do")
                .map(IssueStatus::getId)
                .orElseThrow(() -> new IllegalStateException("Default 'To Do' status missing for tenant " + principal.tenantId()));
    }
}
