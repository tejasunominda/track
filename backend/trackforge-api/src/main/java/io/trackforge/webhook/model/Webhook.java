package io.trackforge.webhook.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "webhooks")
@Getter
@Setter
@NoArgsConstructor
public class Webhook {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @Column(columnDefinition = "TEXT")
    private String events = "[]";

    @Column(nullable = false)
    private boolean active = true;

    private String secret;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Webhook(UUID tenantId, String name, String url) {
        this.tenantId = tenantId;
        this.name = name;
        this.url = url;
    }

    @jakarta.persistence.PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }
}
