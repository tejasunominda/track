package io.trackforge.webhook.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Customer portal / Service Desk stub (Epic 16). Phase 3.
 */
@RestController
@RequestMapping("/api/v1/service-desk")
public class ServiceDeskController {

    @GetMapping
    public ResponseEntity<String> portal() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Service desk customer portal — Phase 3.");
    }
}
