package io.trackforge.search.model;

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
@Table(name = "saved_filters")
@Getter
@Setter
@NoArgsConstructor
public class SavedFilter {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "created_by", nullable = false)
    private UUID createdBy;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String query;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public SavedFilter(UUID tenantId, UUID createdBy, String name, String query) {
        this.tenantId = tenantId;
        this.createdBy = createdBy;
        this.name = name;
        this.query = query;
    }

    @jakarta.persistence.PrePersist
    void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @jakarta.persistence.PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
