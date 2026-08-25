package io.trackforge.auth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

/**
 * Join entity binding a {@link User} to an {@link Organization} with a
 * global org role. Row-Level Security scopes this table by {@code tenant_id}
 * (see V1__init_baseline.sql).
 */
@Entity
@Table(name = "memberships")
@Getter
@Setter
@NoArgsConstructor
public class Membership {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "org_role", nullable = false, length = 32)
    private OrgRole orgRole = OrgRole.ORG_MEMBER;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Membership(UUID tenantId, UUID userId, OrgRole orgRole) {
        this.tenantId = tenantId;
        this.userId = userId;
        this.orgRole = orgRole;
    }

    @jakarta.persistence.PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }
}
