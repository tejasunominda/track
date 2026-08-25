package io.trackforge.issue.service;

import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.dto.admin.CreateWorkflowRequest;
import io.trackforge.issue.dto.admin.IssueStatusDto;
import io.trackforge.issue.dto.admin.WorkflowDto;
import io.trackforge.issue.dto.admin.WorkflowSchemeDto;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.Workflow;
import io.trackforge.issue.model.WorkflowScheme;
import io.trackforge.issue.model.WorkflowTransition;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.WorkflowRepository;
import io.trackforge.issue.repository.WorkflowSchemeRepository;
import io.trackforge.issue.repository.WorkflowTransitionRepository;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkflowBuilderService {

    private final WorkflowRepository workflowRepository;
    private final WorkflowTransitionRepository workflowTransitionRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final WorkflowSchemeRepository workflowSchemeRepository;

    public WorkflowBuilderService(
            WorkflowRepository workflowRepository,
            WorkflowTransitionRepository workflowTransitionRepository,
            IssueStatusRepository issueStatusRepository,
            WorkflowSchemeRepository workflowSchemeRepository) {
        this.workflowRepository = workflowRepository;
        this.workflowTransitionRepository = workflowTransitionRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.workflowSchemeRepository = workflowSchemeRepository;
    }

    @Transactional(readOnly = true)
    public List<IssueStatusDto> listStatuses() {
        return issueStatusRepository.findAll().stream()
                .map(s -> new IssueStatusDto(s.getId(), s.getName(), s.getStatusCategory()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<WorkflowDto> listWorkflows() {
        List<Workflow> workflows = workflowRepository.findAll();
        List<WorkflowTransition> transitions = workflowTransitionRepository.findAll();
        Map<UUID, List<WorkflowTransition>> byWorkflow = transitions.stream()
                .collect(Collectors.groupingBy(WorkflowTransition::getWorkflowId));

        List<IssueStatus> statuses = issueStatusRepository.findAll();
        Map<UUID, String> statusNames = statuses.stream()
                .collect(Collectors.toMap(IssueStatus::getId, IssueStatus::getName));

        return workflows.stream().map(w -> new WorkflowDto(
                w.getId(), w.getProjectId(), w.getName(),
                byWorkflow.getOrDefault(w.getId(), List.of()).stream()
                        .map(t -> new WorkflowDto.WorkflowTransitionDto(
                                t.getFromStatusId(), statusNames.get(t.getFromStatusId()),
                                t.getToStatusId(), statusNames.get(t.getToStatusId())))
                        .toList())).toList();
    }

    @Transactional
    public WorkflowDto createWorkflow(CreateWorkflowRequest request) {
        TrackForgePrincipal principal = currentPrincipal();
        Workflow workflow = workflowRepository.save(new Workflow(principal.tenantId(), request.projectId(), request.name()));

        List<WorkflowTransition> savedTransitions = request.transitions().stream()
                .map(t -> new WorkflowTransition(principal.tenantId(), workflow.getId(), t.fromStatusId(), t.toStatusId()))
                .map(workflowTransitionRepository::save)
                .toList();

        List<IssueStatus> statuses = issueStatusRepository.findAllById(
                savedTransitions.stream().flatMap(t -> java.util.stream.Stream.of(t.getFromStatusId(), t.getToStatusId())).distinct().toList());
        Map<UUID, String> statusNames = statuses.stream().collect(Collectors.toMap(IssueStatus::getId, IssueStatus::getName));

        return new WorkflowDto(workflow.getId(), workflow.getProjectId(), workflow.getName(),
                savedTransitions.stream().map(t -> new WorkflowDto.WorkflowTransitionDto(
                        t.getFromStatusId(), statusNames.get(t.getFromStatusId()),
                        t.getToStatusId(), statusNames.get(t.getToStatusId()))).toList());
    }

    @Transactional
    public WorkflowSchemeDto createScheme(WorkflowSchemeDto request) {
        TrackForgePrincipal principal = currentPrincipal();
        if (!workflowRepository.existsById(request.workflowId())) {
            throw new NotFoundException("WORKFLOW_NOT_FOUND", "Workflow not found.");
        }
        WorkflowScheme scheme = workflowSchemeRepository.save(new WorkflowScheme(
                principal.tenantId(), request.projectId(), request.issueTypeId(), request.workflowId()));
        return new WorkflowSchemeDto(scheme.getId(), scheme.getProjectId(), scheme.getIssueTypeId(), scheme.getWorkflowId());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
