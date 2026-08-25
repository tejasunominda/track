package io.trackforge.issue.controller;

import io.trackforge.issue.dto.CreateIssueRequest;
import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.dto.UpdateIssueRequest;
import io.trackforge.issue.service.IssueService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<IssueSummaryResponse>> listIssues(@RequestParam UUID projectId) {
        return ResponseEntity.ok(issueService.listIssuesByProject(projectId));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueSummaryResponse> createIssue(@Valid @RequestBody CreateIssueRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(issueService.createIssue(request));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueSummaryResponse> getIssue(@PathVariable UUID id) {
        return issueService.getIssue(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueSummaryResponse> updateIssue(@PathVariable UUID id, @Valid @RequestBody UpdateIssueRequest request) {
        return ResponseEntity.ok(issueService.updateIssue(id, request));
    }
}
