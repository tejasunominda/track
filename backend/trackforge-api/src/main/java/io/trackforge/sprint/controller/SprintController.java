package io.trackforge.sprint.controller;

import io.trackforge.sprint.dto.CreateSprintRequest;
import io.trackforge.sprint.dto.SprintResponse;
import io.trackforge.sprint.service.SprintService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/sprints")
public class SprintController {

    private final SprintService sprintService;

    public SprintController(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SprintResponse> createSprint(@Valid @RequestBody CreateSprintRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sprintService.createSprint(request));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<SprintResponse>> listSprints(@RequestParam UUID projectId) {
        return ResponseEntity.ok(sprintService.listSprints(projectId));
    }

    @PutMapping("/{id}/start")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SprintResponse> startSprint(@PathVariable UUID id) {
        return ResponseEntity.ok(sprintService.startSprint(id));
    }

    @PutMapping("/{id}/complete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SprintResponse> completeSprint(@PathVariable UUID id) {
        return ResponseEntity.ok(sprintService.completeSprint(id));
    }
}
