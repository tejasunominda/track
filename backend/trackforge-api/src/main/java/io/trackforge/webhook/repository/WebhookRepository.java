package io.trackforge.webhook.repository;

import io.trackforge.webhook.model.Webhook;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebhookRepository extends JpaRepository<Webhook, UUID> {

    List<Webhook> findByActiveTrue();
}
