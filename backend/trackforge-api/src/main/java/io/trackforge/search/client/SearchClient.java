package io.trackforge.search.client;

import io.trackforge.search.dto.SearchResult;
import java.util.List;

/**
 * Abstraction over the search backend (OpenSearch/Elasticsearch).
 * The default in-process implementation is a no-op until an external
 * cluster is configured; TQL still evaluates against Postgres.
 */
public interface SearchClient {

    void index(SearchDocument document);

    void delete(String id);

    SearchResult search(String query, List<String> fields);

    record SearchDocument(
            String id,
            java.util.UUID tenantId,
            java.util.UUID projectId,
            java.util.UUID issueId,
            String summary,
            String description,
            String statusName,
            String typeName,
            String priority,
            String reporter,
            String assignee) {
    }
}
