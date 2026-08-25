package io.trackforge.webhook.controller;

import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.webhook.dto.WebhookDto;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/webhooks")
public class WebhookController {

    @PostMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<WebhookDto> create(@AuthenticationPrincipal TrackForgePrincipal principal, @RequestBody WebhookDto dto) {
        // Stub: Phase 2 implementation.
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new WebhookDto(UUID.randomUUID(), dto.name(), dto.url(), dto.events()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<List<WebhookDto>> list() {
        return ResponseEntity.ok(List.of());
    }
}
