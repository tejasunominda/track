package io.trackforge.webhook.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.webhook.dto.WebhookCreateRequest;
import io.trackforge.webhook.dto.WebhookDto;
import io.trackforge.webhook.model.Webhook;
import io.trackforge.webhook.repository.WebhookRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WebhookService {

    private final WebhookRepository webhookRepository;
    private final ObjectMapper objectMapper;

    public WebhookService(WebhookRepository webhookRepository, ObjectMapper objectMapper) {
        this.webhookRepository = webhookRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<WebhookDto> listForTenant() {
        return webhookRepository.findByActiveTrue().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public WebhookDto create(WebhookCreateRequest request) {
        TrackForgePrincipal principal = currentPrincipal();
        Webhook webhook = new Webhook(principal.tenantId(), request.name(), request.url());
        webhook.setEvents(toJson(request.events()));
        webhook.setSecret(request.secret());
        return toDto(webhookRepository.save(webhook));
    }

    @Transactional
    public WebhookDto update(UUID id, WebhookCreateRequest request) {
        TrackForgePrincipal principal = currentPrincipal();
        Webhook webhook = webhookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("WEBHOOK_NOT_FOUND", "Webhook not found."));
        if (!webhook.getTenantId().equals(principal.tenantId())) {
            throw new AccessDeniedException("Webhook does not belong to this tenant");
        }
        webhook.setName(request.name());
        webhook.setUrl(request.url());
        webhook.setEvents(toJson(request.events()));
        webhook.setSecret(request.secret());
        return toDto(webhookRepository.save(webhook));
    }

    @Transactional
    public void delete(UUID id) {
        TrackForgePrincipal principal = currentPrincipal();
        Webhook webhook = webhookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("WEBHOOK_NOT_FOUND", "Webhook not found."));
        if (!webhook.getTenantId().equals(principal.tenantId())) {
            throw new AccessDeniedException("Webhook does not belong to this tenant");
        }
        webhook.setActive(false);
        webhookRepository.save(webhook);
    }

    private WebhookDto toDto(Webhook webhook) {
        return new WebhookDto(
                webhook.getId(),
                webhook.getName(),
                webhook.getUrl(),
                fromJson(webhook.getEvents()));
    }

    private String toJson(List<String> events) {
        try {
            return objectMapper.writeValueAsString(events);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid events list", e);
        }
    }

    private List<String> fromJson(String json) {
        try {
            return objectMapper.readValue(json != null ? json : "[]", new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            return List.of();
        }
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
