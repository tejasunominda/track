package io.trackforge.dashboard.controller;

import io.trackforge.dashboard.dto.DashboardDto;
import io.trackforge.dashboard.service.DashboardService;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboards")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<DashboardDto>> list() {
        return ResponseEntity.ok(dashboardService.list());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<DashboardDto> create(@RequestBody DashboardDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                dashboardService.create(request.name(), request.widgets()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<DashboardDto> update(@PathVariable UUID id, @RequestBody DashboardDto request) {
        return ResponseEntity.ok(dashboardService.update(id, request.name(), request.widgets()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        dashboardService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
