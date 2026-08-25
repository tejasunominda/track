package io.trackforge.search.client;

import io.trackforge.search.dto.SearchResult;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NoOpSearchClient implements SearchClient {

    private static final Logger log = LoggerFactory.getLogger(NoOpSearchClient.class);

    @Override
    public void index(SearchDocument document) {
        log.debug("No-op index: {}", document.id());
    }

    @Override
    public void delete(String id) {
        log.debug("No-op delete: {}", id);
    }

    @Override
    public SearchResult search(String query, List<String> fields) {
        return new SearchResult(null, null);
    }
}
