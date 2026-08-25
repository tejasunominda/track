package io.trackforge.issue.service;

import io.trackforge.auth.repository.UserRepository;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.dto.IssueCommentDto;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueComment;
import io.trackforge.issue.repository.IssueCommentRepository;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.webhook.service.WebhookDispatcher;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IssueCommentService {

    private final IssueCommentRepository commentRepository;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final WebhookDispatcher webhookDispatcher;

    public IssueCommentService(IssueCommentRepository commentRepository, IssueRepository issueRepository, UserRepository userRepository, WebhookDispatcher webhookDispatcher) {
        this.commentRepository = commentRepository;
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.webhookDispatcher = webhookDispatcher;
    }

    @Transactional(readOnly = true)
    public List<IssueCommentDto> listComments(UUID issueId) {
        if (!issueRepository.existsById(issueId)) {
            throw new NotFoundException("ISSUE_NOT_FOUND", "Issue not found.");
        }
        List<IssueComment> comments = commentRepository.findByIssueIdOrderByCreatedAtAsc(issueId);
        List<UUID> authorIds = comments.stream().map(IssueComment::getAuthorId).distinct().toList();
        Map<UUID, String> authorNames = userRepository.findAllById(authorIds).stream()
                .collect(Collectors.toMap(io.trackforge.auth.model.User::getId, io.trackforge.auth.model.User::getDisplayName));
        return comments.stream()
                .map(c -> new IssueCommentDto(c.getId(), c.getIssueId(), c.getAuthorId(),
                        authorNames.get(c.getAuthorId()), c.getBody(), c.getCreatedAt(), c.getUpdatedAt()))
                .toList();
    }

    @Transactional
    public IssueCommentDto createComment(UUID issueId, String body) {
        TrackForgePrincipal principal = currentPrincipal();
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException("ISSUE_NOT_FOUND", "Issue not found."));
        IssueComment comment = new IssueComment(principal.tenantId(), issue.getId(), principal.userId(), body);
        IssueComment saved = commentRepository.save(comment);
        IssueCommentDto dto = new IssueCommentDto(saved.getId(), saved.getIssueId(), saved.getAuthorId(),
                principal.email(), saved.getBody(), saved.getCreatedAt(), saved.getUpdatedAt());
        webhookDispatcher.dispatch("comment.created", "IssueComment", saved.getId(), dto);
        return dto;
    }

    @Transactional
    public IssueCommentDto updateComment(UUID commentId, String body) {
        TrackForgePrincipal principal = currentPrincipal();
        IssueComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("COMMENT_NOT_FOUND", "Comment not found."));
        if (!comment.getAuthorId().equals(principal.userId())) {
            throw new AccessDeniedException("Can only edit your own comments");
        }
        comment.setBody(body);
        IssueComment saved = commentRepository.save(comment);
        return new IssueCommentDto(saved.getId(), saved.getIssueId(), saved.getAuthorId(),
                principal.email(), saved.getBody(), saved.getCreatedAt(), saved.getUpdatedAt());
    }

    @Transactional
    public void deleteComment(UUID commentId) {
        TrackForgePrincipal principal = currentPrincipal();
        IssueComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("COMMENT_NOT_FOUND", "Comment not found."));
        if (!comment.getAuthorId().equals(principal.userId())) {
            throw new AccessDeniedException("Can only delete your own comments");
        }
        commentRepository.delete(comment);
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
