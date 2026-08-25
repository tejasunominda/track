package io.trackforge.project.model;

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

/**
 * Binds a user to a project with a role (e.g. ProjectAdmin, ProjectMember,
 * ProjectViewer). Feature Ticket [F3-02].
 */
@Entity
@Table(name = "project_memberships")
@Getter
@Setter
@NoArgsConstructor
public class ProjectMembership {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "role_name", nullable = false, length = 64)
    private String roleName;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public ProjectMembership(UUID tenantId, UUID projectId, UUID userId, String roleName) {
        this.tenantId = tenantId;
        this.projectId = projectId;
        this.userId = userId;
        this.roleName = roleName;
    }

    @jakarta.persistence.PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }
}
