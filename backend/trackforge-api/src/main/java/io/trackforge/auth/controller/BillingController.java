package io.trackforge.auth.controller;

import io.trackforge.common.security.TrackForgePrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Billing & subscription stub (Epic 18). Phase 3.
 */
@RestController
@RequestMapping("/api/v1/billing")
public class BillingController {

    @GetMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<String> status(@AuthenticationPrincipal TrackForgePrincipal principal) {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Billing API for tenant " + principal.tenantId() + " — Phase 3.");
    }
}
