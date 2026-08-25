package io.trackforge.report.controller;

import io.trackforge.report.dto.RoadmapItem;
import io.trackforge.report.service.PortfolioService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Cross-project portfolio/roadmap (Epic 17).
 */
@RestController
@RequestMapping("/api/v1/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/roadmap")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<RoadmapItem>> roadmap() {
        return ResponseEntity.ok(portfolioService.roadmap());
    }
}
