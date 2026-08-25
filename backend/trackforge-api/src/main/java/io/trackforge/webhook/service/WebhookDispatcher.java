package io.trackforge.webhook.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.trackforge.webhook.model.Webhook;
import io.trackforge.webhook.repository.WebhookRepository;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

/**
 * Dispatches webhook events to active subscribers. Signs each payload with
 * HMAC-SHA256 when a secret is configured.
 */
@Service
public class WebhookDispatcher {

    private static final Logger log = LoggerFactory.getLogger(WebhookDispatcher.class);
    private static final String HMAC_ALGORITHM = "HmacSHA256";

    private final WebhookRepository webhookRepository;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    public WebhookDispatcher(WebhookRepository webhookRepository, ObjectMapper objectMapper) {
        this.webhookRepository = webhookRepository;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.create();
    }

    public void dispatch(String event, String entityType, java.util.UUID entityId, Object payload) {
        List<Webhook> hooks = webhookRepository.findByActiveTrue();
        for (Webhook hook : hooks) {
            if (!subscribed(hook, event)) {
                continue;
            }
            String body = buildBody(event, entityType, entityId, payload);
            String signature = sign(body, hook.getSecret());
            try {
                restClient.post()
                        .uri(URI.create(hook.getUrl()))
                        .header("Content-Type", "application/json")
                        .header("X-TrackForge-Event", event)
                        .header("X-TrackForge-Delivery", java.util.UUID.randomUUID().toString())
                        .header("X-TrackForge-Signature", signature != null ? signature : "")
                        .body(body)
                        .retrieve()
                        .toBodilessEntity();
                log.info("Webhook delivered: {} to {}", hook.getId(), hook.getUrl());
            } catch (Exception e) {
                log.warn("Webhook delivery failed for {} to {}", hook.getId(), hook.getUrl(), e);
            }
        }
    }

    private boolean subscribed(Webhook hook, String event) {
        if (hook.getEvents() == null) return false;
        try {
            List<String> subscribed = objectMapper.readValue(hook.getEvents(), new com.fasterxml.jackson.core.type.TypeReference<List<String>>() {});
            return subscribed.contains(event) || subscribed.contains("*");
        } catch (Exception e) {
            return false;
        }
    }

    private String buildBody(String event, String entityType, java.util.UUID entityId, Object payload) {
        try {
            Map<String, Object> body = Map.of(
                    "event", event,
                    "entityType", entityType,
                    "entityId", entityId,
                    "timestamp", Instant.now().toString(),
                    "payload", payload != null ? payload : Map.of());
            return objectMapper.writeValueAsString(body);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to build webhook payload", e);
        }
    }

    private String sign(String body, String secret) {
        if (secret == null || secret.isBlank()) {
            return null;
        }
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM));
            byte[] signature = mac.doFinal(body.getBytes(StandardCharsets.UTF_8));
            return "sha256=" + Base64.getEncoder().encodeToString(signature);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to sign webhook payload", e);
        }
    }
}
