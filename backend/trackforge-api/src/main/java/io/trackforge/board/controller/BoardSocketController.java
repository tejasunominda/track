package io.trackforge.board.controller;

import io.trackforge.board.dto.BoardUpdateEvent;
import io.trackforge.board.dto.MoveIssueMessage;
import io.trackforge.board.service.IssueRankService;
import io.trackforge.common.tenant.TenantContext;
import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import io.trackforge.issue.service.IssueService;
import io.trackforge.issue.service.WorkflowTransitionEngine;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class BoardSocketController {

    private final IssueService issueService;
    private final IssueRepository issueRepository;
    private final IssueRankService rankService;
    private final WorkflowTransitionEngine workflowTransitionEngine;
    private final IssueStatusRepository issueStatusRepository;
    private final IssueTypeRepository issueTypeRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public BoardSocketController(
            IssueService issueService,
            IssueRepository issueRepository,
            IssueRankService rankService,
            WorkflowTransitionEngine workflowTransitionEngine,
            IssueStatusRepository issueStatusRepository,
            IssueTypeRepository issueTypeRepository,
            SimpMessagingTemplate messagingTemplate) {
        this.issueService = issueService;
        this.issueRepository = issueRepository;
        this.rankService = rankService;
        this.workflowTransitionEngine = workflowTransitionEngine;
        this.issueStatusRepository = issueStatusRepository;
        this.issueTypeRepository = issueTypeRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/board/{projectId}/move")
    public void moveIssue(@DestinationVariable UUID projectId, MoveIssueMessage message) {
        Issue issue = issueRepository.findById(message.issueId())
                .orElseThrow(() -> new IllegalArgumentException("Issue not found"));
        if (!issue.getProjectId().equals(projectId)) {
            throw new IllegalArgumentException("Issue does not belong to project");
        }

        workflowTransitionEngine.requireValidTransition(issue.getProjectId(), issue.getIssueTypeId(), issue.getStatusId(), message.newStatusId());

        String newRank = resolveRank(projectId, message.newStatusId(), message.afterIssueId());

        TenantContext.set(issue.getTenantId());
        try {
            issue.setStatusId(message.newStatusId());
            issue.setRank(newRank);
            Issue saved = issueRepository.save(issue);
            IssueSummaryResponse summary = toSummary(saved);
            messagingTemplate.convertAndSend("/topic/board/" + projectId,
                    new BoardUpdateEvent(projectId, "MOVED", summary));
        } finally {
            TenantContext.clear();
        }
    }

    private String resolveRank(UUID projectId, UUID newStatusId, String afterIssueId) {
        if (afterIssueId == null) {
            return rankService.rankAtEnd(projectId);
        }
        List<Issue> afterIssue = issueRepository.findAllById(List.of(UUID.fromString(afterIssueId)));
        if (afterIssue.isEmpty()) {
            return rankService.rankAtEnd(projectId);
        }
        Issue after = afterIssue.get(0);
        List<Issue> nextIssues = issueRepository.findByProjectIdOrderByRankAsc(projectId).stream()
                .filter(i -> i.getStatusId().equals(newStatusId))
                .filter(i -> i.getRank() != null)
                .sorted(Comparator.comparing(Issue::getRank))
                .toList();
        int idx = -1;
        for (int i = 0; i < nextIssues.size(); i++) {
            if (nextIssues.get(i).getId().equals(after.getId())) {
                idx = i;
                break;
            }
        }
        String prev = idx >= 0 ? nextIssues.get(idx).getRank() : null;
        String next = idx + 1 < nextIssues.size() ? nextIssues.get(idx + 1).getRank() : null;
        return rankService.rankBetween(prev, next);
    }

    private IssueSummaryResponse toSummary(Issue issue) {
        List<IssueType> types = issueTypeRepository.findAllById(List.of(issue.getIssueTypeId()));
        List<IssueStatus> statuses = issueStatusRepository.findAllById(List.of(issue.getStatusId()));
        Map<UUID, IssueType> typeMap = types.stream().collect(Collectors.toMap(IssueType::getId, t -> t));
        Map<UUID, IssueStatus> statusMap = statuses.stream().collect(Collectors.toMap(IssueStatus::getId, s -> s));
        IssueType type = typeMap.get(issue.getIssueTypeId());
        IssueStatus status = statusMap.get(issue.getStatusId());
        return new IssueSummaryResponse(
                issue.getId(), issue.getProjectId(),
                type != null ? type.getName() : null,
                status != null ? status.getName() : null,
                status != null ? status.getStatusCategory().name() : null,
                issue.getSummary(), issue.getDescription(), issue.getReporterId(),
                issue.getAssigneeId(), issue.getPriority(), issue.getStoryPoints(),
                issue.getCreatedAt(), issue.getUpdatedAt());
    }
}
