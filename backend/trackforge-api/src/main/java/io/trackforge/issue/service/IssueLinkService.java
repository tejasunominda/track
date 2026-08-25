package io.trackforge.issue.service;

import io.trackforge.common.exception.ConflictException;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.issue.dto.IssueLinkDto;
import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.dto.SubtaskSummary;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueLink;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueLinkRepository;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IssueLinkService {

    private final IssueLinkRepository issueLinkRepository;
    private final IssueRepository issueRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final IssueTypeRepository issueTypeRepository;

    public IssueLinkService(
            IssueLinkRepository issueLinkRepository,
            IssueRepository issueRepository,
            IssueStatusRepository issueStatusRepository,
            IssueTypeRepository issueTypeRepository) {
        this.issueLinkRepository = issueLinkRepository;
        this.issueRepository = issueRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.issueTypeRepository = issueTypeRepository;
    }

    @Transactional
    public IssueLinkDto linkIssues(UUID sourceId, UUID targetId, String linkType) {
        TrackForgePrincipal principal = currentPrincipal();
        if (!issueRepository.existsById(sourceId) || !issueRepository.existsById(targetId)) {
            throw new NotFoundException("ISSUE_NOT_FOUND", "One or both issues not found.");
        }
        if (sourceId.equals(targetId)) {
            throw new ConflictException("SELF_LINK", "Cannot link an issue to itself.");
        }

        // Ensure the reverse relationship is deterministic.
        final UUID from;
        final UUID to;
        final String normalizedType;
        if (linkType.equals("BLOCKED_BY")) {
            from = targetId;
            to = sourceId;
            normalizedType = "BLOCKS";
        } else {
            from = sourceId;
            to = targetId;
            normalizedType = linkType;
        }

        if (issueLinkRepository.findBySourceIdOrTargetId(from, to).stream()
                .anyMatch(l -> l.getSourceId().equals(from) && l.getTargetId().equals(to) && l.getLinkType().equals(normalizedType))) {
            throw new ConflictException("LINK_EXISTS", "This link already exists.");
        }

        IssueLink link = new IssueLink(principal.tenantId(), from, to, normalizedType);
        return toDto(issueLinkRepository.save(link));
    }

    @Transactional(readOnly = true)
    public List<IssueLinkDto> getLinks(UUID issueId) {
        if (!issueRepository.existsById(issueId)) {
            throw new NotFoundException("ISSUE_NOT_FOUND", "Issue not found.");
        }

        List<IssueLink> links = issueLinkRepository.findBySourceIdOrTargetId(issueId, issueId);
        List<UUID> otherIds = links.stream()
                .flatMap(l -> java.util.stream.Stream.of(l.getSourceId(), l.getTargetId()))
                .distinct().toList();

        List<Issue> issues = issueRepository.findAllById(otherIds);
        List<IssueStatus> statuses = issueStatusRepository.findAllById(issues.stream().map(Issue::getStatusId).distinct().toList());
        List<IssueType> types = issueTypeRepository.findAllById(issues.stream().map(Issue::getIssueTypeId).distinct().toList());

        Map<UUID, IssueSummaryResponse> summaries = issues.stream().collect(Collectors.toMap(Issue::getId,
                i -> toSummary(i, types, statuses)));

        return links.stream().map(l -> {
            UUID relatedId = l.getSourceId().equals(issueId) ? l.getTargetId() : l.getSourceId();
            return new IssueLinkDto(l.getId(), l.getSourceId(), l.getTargetId(), l.getLinkType(), summaries.get(relatedId));
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<SubtaskSummary> getSubtasks(UUID parentId) {
        List<Issue> subtasks = issueRepository.findByParentId(parentId);
        List<IssueStatus> statuses = issueStatusRepository.findAllById(subtasks.stream().map(Issue::getStatusId).distinct().toList());
        Map<UUID, IssueStatus> statusMap = statuses.stream().collect(Collectors.toMap(IssueStatus::getId, s -> s));
        return subtasks.stream().map(s -> new SubtaskSummary(
                s.getId(), s.getSummary(),
                statusMap.getOrDefault(s.getStatusId(), new IssueStatus()).getName(),
                statusMap.getOrDefault(s.getStatusId(), new IssueStatus()).getStatusCategory().name())).toList();
    }

    @Transactional
    public void deleteLink(UUID linkId) {
        TrackForgePrincipal principal = currentPrincipal();
        IssueLink link = issueLinkRepository.findById(linkId)
                .orElseThrow(() -> new NotFoundException("LINK_NOT_FOUND", "Link not found."));
        if (!link.getTenantId().equals(principal.tenantId())) {
            throw new AccessDeniedException("Link does not belong to this tenant");
        }
        issueLinkRepository.delete(link);
    }

    private IssueSummaryResponse toSummary(Issue issue, List<IssueType> types, List<IssueStatus> statuses) {
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

    private IssueLinkDto toDto(IssueLink link) {
        return new IssueLinkDto(link.getId(), link.getSourceId(), link.getTargetId(), link.getLinkType(), null);
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
