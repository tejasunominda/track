package io.trackforge.workflow.controller;

import io.trackforge.issue.dto.admin.CreateWorkflowRequest;
import io.trackforge.issue.dto.admin.IssueStatusDto;
import io.trackforge.issue.dto.admin.WorkflowDto;
import io.trackforge.issue.dto.admin.WorkflowSchemeDto;
import io.trackforge.issue.service.WorkflowBuilderService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/workflows")
public class WorkflowBuilderController {

    private final WorkflowBuilderService workflowBuilderService;

    public WorkflowBuilderController(WorkflowBuilderService workflowBuilderService) {
        this.workflowBuilderService = workflowBuilderService;
    }

    @GetMapping("/statuses")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<List<IssueStatusDto>> listStatuses() {
        return ResponseEntity.ok(workflowBuilderService.listStatuses());
    }

    @GetMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<List<WorkflowDto>> listWorkflows() {
        return ResponseEntity.ok(workflowBuilderService.listWorkflows());
    }

    @PostMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<WorkflowDto> createWorkflow(@Valid @RequestBody CreateWorkflowRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workflowBuilderService.createWorkflow(request));
    }

    @PostMapping("/schemes")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<WorkflowSchemeDto> createScheme(@Valid @RequestBody WorkflowSchemeDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workflowBuilderService.createScheme(request));
    }
}
