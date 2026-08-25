package io.trackforge.search.service;

import io.trackforge.search.dto.SearchResult;
import org.springframework.stereotype.Service;

/**
 * Placeholder for TrackForge Query Language (TQL) execution against
 * Elasticsearch (Feature Ticket [F11-02]). Phase 2 implementation will:
 * - parse TQL strings into an AST
 * - translate to Elasticsearch queries
 * - return paginated, filterable issue results.
 */
@Service
public class TqlSearchService {

    public SearchResult search(String tql) {
        throw new UnsupportedOperationException("TQL search requires Elasticsearch integration (Phase 2).");
    }
}
