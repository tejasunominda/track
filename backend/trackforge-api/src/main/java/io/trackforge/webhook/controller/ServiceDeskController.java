package io.trackforge.webhook.controller;

import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.webhook.dto.ServiceDeskRequest;
import io.trackforge.webhook.service.ServiceDeskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Customer portal / Service Desk (Epic 16). Creates support tickets as issues.
 */
@RestController
@RequestMapping("/api/v1/service-desk")
public class ServiceDeskController {

    private final ServiceDeskService serviceDeskService;

    public ServiceDeskController(ServiceDeskService serviceDeskService) {
        this.serviceDeskService = serviceDeskService;
    }

    @PostMapping("/tickets")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<IssueSummaryResponse> createTicket(@Valid @RequestBody ServiceDeskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceDeskService.createTicket(request));
    }
}
