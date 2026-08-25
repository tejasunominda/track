package io.trackforge.search.indexer;

import io.trackforge.issue.model.Issue;
import io.trackforge.search.client.SearchClient;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class IssueIndexer {

    private final SearchClient searchClient;

    public IssueIndexer(SearchClient searchClient) {
        this.searchClient = searchClient;
    }

    public void index(Issue issue, String statusName, String typeName, String reporter, String assignee) {
        searchClient.index(new SearchClient.SearchDocument(
                issue.getId().toString(),
                issue.getTenantId(),
                issue.getProjectId(),
                issue.getId(),
                issue.getSummary(),
                issue.getDescription(),
                statusName,
                typeName,
                issue.getPriority(),
                reporter,
                assignee));
    }

    public void delete(UUID issueId) {
        searchClient.delete(issueId.toString());
    }
}
