package io.trackforge.report.controller;

import io.trackforge.report.dto.BurndownResponse;
import io.trackforge.report.dto.VelocityResponse;
import io.trackforge.report.service.ReportService;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/burndown/{sprintId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BurndownResponse> burndown(@PathVariable UUID sprintId) {
        return ResponseEntity.ok(reportService.burndownForSprint(sprintId));
    }

    @GetMapping("/velocity")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<VelocityResponse>> velocity(@RequestParam UUID projectId) {
        return ResponseEntity.ok(reportService.velocityBySprint(projectId));
    }
}
