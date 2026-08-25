package io.trackforge.report.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Cross-project portfolio/roadmap stub (Epic 17). Phase 3.
 */
@RestController
@RequestMapping("/api/v1/portfolio")
public class PortfolioController {

    @GetMapping
    public ResponseEntity<String> roadmap() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Portfolio roadmap API — Phase 3.");
    }
}
