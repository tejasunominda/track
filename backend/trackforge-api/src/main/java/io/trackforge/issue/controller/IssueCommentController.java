package io.trackforge.issue.controller;

import io.trackforge.issue.dto.IssueCommentDto;
import io.trackforge.issue.service.IssueCommentService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/issues/{issueId}/comments")
public class IssueCommentController {

    private final IssueCommentService commentService;

    public IssueCommentController(IssueCommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<IssueCommentDto>> list(@PathVariable UUID issueId) {
        return ResponseEntity.ok(commentService.listComments(issueId));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueCommentDto> create(@PathVariable UUID issueId, @Valid @RequestBody CommentBody body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(issueId, body.body()));
    }

    @PutMapping("/{commentId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueCommentDto> update(@PathVariable UUID commentId, @Valid @RequestBody CommentBody body) {
        return ResponseEntity.ok(commentService.updateComment(commentId, body.body()));
    }

    @DeleteMapping("/{commentId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    public record CommentBody(@NotBlank String body) {
    }
}
