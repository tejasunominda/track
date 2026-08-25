package io.trackforge.issue.model;

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
@Table(name = "issue_links")
@Getter
@Setter
@NoArgsConstructor
public class IssueLink {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "source_id", nullable = false)
    private UUID sourceId;

    @Column(name = "target_id", nullable = false)
    private UUID targetId;

    @Column(name = "link_type", nullable = false, length = 32)
    private String linkType;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public IssueLink(UUID tenantId, UUID sourceId, UUID targetId, String linkType) {
        this.tenantId = tenantId;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.linkType = linkType;
    }

    @jakarta.persistence.PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }
}
