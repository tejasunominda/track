package io.trackforge.search.controller;

import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.search.dto.SearchResult;
import io.trackforge.search.service.TqlSearchService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search/tql")
public class TqlSearchController {

    private final TqlSearchService tqlSearchService;

    public TqlSearchController(TqlSearchService tqlSearchService) {
        this.tqlSearchService = tqlSearchService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SearchResult> tqlSearch(@RequestParam String q) {
        List<IssueSummaryResponse> results = tqlSearchService.search(q);
        return ResponseEntity.ok(new SearchResult(null, results));
    }

    @GetMapping("/fields")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<String>> fields() {
        return ResponseEntity.ok(tqlSearchService.autocompleteFields());
    }
}
