package io.trackforge.issue.controller;

import io.trackforge.issue.dto.IssueLinkDto;
import io.trackforge.issue.dto.SubtaskSummary;
import io.trackforge.issue.service.IssueLinkService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/issues/{issueId}")
public class IssueLinkController {

    private final IssueLinkService issueLinkService;

    public IssueLinkController(IssueLinkService issueLinkService) {
        this.issueLinkService = issueLinkService;
    }

    @GetMapping("/links")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<IssueLinkDto>> list(@PathVariable UUID issueId) {
        return ResponseEntity.ok(issueLinkService.getLinks(issueId));
    }

    @PostMapping("/links")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueLinkDto> create(
            @PathVariable UUID issueId,
            @Valid @RequestBody LinkRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                issueLinkService.linkIssues(issueId, request.targetId(), request.linkType()));
    }

    @GetMapping("/subtasks")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<SubtaskSummary>> subtasks(@PathVariable UUID issueId) {
        return ResponseEntity.ok(issueLinkService.getSubtasks(issueId));
    }

    @DeleteMapping("/links/{linkId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable UUID linkId) {
        issueLinkService.deleteLink(linkId);
        return ResponseEntity.noContent().build();
    }

    public record LinkRequest(UUID targetId, @NotBlank String linkType) {
    }
}
