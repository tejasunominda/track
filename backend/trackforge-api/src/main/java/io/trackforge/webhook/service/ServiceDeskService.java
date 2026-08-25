package io.trackforge.webhook.service;

import io.trackforge.common.exception.NotFoundException;
import io.trackforge.issue.dto.CreateIssueRequest;
import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueTypeRepository;
import io.trackforge.issue.service.IssueService;
import io.trackforge.webhook.dto.ServiceDeskRequest;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Customer portal support ticket creation (Epic 16). Each ticket becomes an
 * issue of type "Bug" or "Support" in the designated project.
 */
@Service
public class ServiceDeskService {

    private final IssueService issueService;
    private final IssueTypeRepository issueTypeRepository;

    public ServiceDeskService(IssueService issueService, IssueTypeRepository issueTypeRepository) {
        this.issueService = issueService;
        this.issueTypeRepository = issueTypeRepository;
    }

    @Transactional
    public IssueSummaryResponse createTicket(ServiceDeskRequest request) {
        IssueType type = issueTypeRepository.findByNameIgnoreCase("Bug")
                .or(() -> issueTypeRepository.findByNameIgnoreCase("Support"))
                .orElseThrow(() -> new NotFoundException("ISSUE_TYPE_NOT_FOUND", "No support issue type found."));

        return issueService.createIssue(new CreateIssueRequest(
                request.projectId(),
                type.getId(),
                request.summary(),
                request.description(),
                null,
                null,
                null,
                null));
    }
}
