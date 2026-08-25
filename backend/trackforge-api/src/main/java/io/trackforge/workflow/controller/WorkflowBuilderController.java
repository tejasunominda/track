package io.trackforge.workflow.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Visual workflow builder backend stub (Feature Ticket [F14-01]).
 * Phase 2: expose workflow CRUD + status/transition endpoints for the
 * React Flow canvas in the admin console.
 */
@RestController
@RequestMapping("/api/v1/admin/workflows")
public class WorkflowBuilderController {

    @GetMapping
    public ResponseEntity<String> list() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Workflow builder API — Phase 2.");
    }
}
