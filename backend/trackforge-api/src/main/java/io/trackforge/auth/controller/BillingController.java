package io.trackforge.auth.controller;

import io.trackforge.auth.dto.BillingStatusResponse;
import io.trackforge.auth.service.BillingService;
import io.trackforge.common.security.TrackForgePrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Billing & subscription status (Epic 18).
 */
@RestController
@RequestMapping("/api/v1/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<BillingStatusResponse> status(@AuthenticationPrincipal TrackForgePrincipal principal) {
        return ResponseEntity.ok(billingService.status(principal.tenantId()));
    }
}
