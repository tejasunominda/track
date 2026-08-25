package io.trackforge.webhook.controller;

import io.trackforge.webhook.dto.WebhookCreateRequest;
import io.trackforge.webhook.dto.WebhookDto;
import io.trackforge.webhook.service.WebhookDispatcher;
import io.trackforge.webhook.service.WebhookService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
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
@RequestMapping("/api/v1/webhooks")
public class WebhookController {

    private final WebhookService webhookService;
    private final WebhookDispatcher webhookDispatcher;

    public WebhookController(WebhookService webhookService, WebhookDispatcher webhookDispatcher) {
        this.webhookService = webhookService;
        this.webhookDispatcher = webhookDispatcher;
    }

    @PostMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<WebhookDto> create(@Valid @RequestBody WebhookCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(webhookService.create(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<List<WebhookDto>> list() {
        return ResponseEntity.ok(webhookService.listForTenant());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<WebhookDto> update(@PathVariable UUID id, @Valid @RequestBody WebhookCreateRequest request) {
        return ResponseEntity.ok(webhookService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        webhookService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/test")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<Void> testDispatch(@PathVariable UUID id) {
        webhookDispatcher.dispatch("webhook.test", "Webhook", id, Map.of("webhookId", id));
        return ResponseEntity.accepted().build();
    }
}
