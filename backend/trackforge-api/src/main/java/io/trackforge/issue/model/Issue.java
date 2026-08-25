package io.trackforge.issue.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "issues")
@Getter
@Setter
@NoArgsConstructor
public class Issue {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "issue_type_id", nullable = false)
    private UUID issueTypeId;

    @Column(name = "status_id", nullable = false)
    private UUID statusId;

    @Column(name = "parent_id")
    private UUID parentId;

    @Column(nullable = false)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "reporter_id", nullable = false)
    private UUID reporterId;

    @Column(name = "assignee_id")
    private UUID assigneeId;

    private String priority;

    @Column(name = "labels", columnDefinition = "TEXT")
    private String labels = "[]";

    @Column(name = "components", columnDefinition = "TEXT")
    private String components = "[]";

    @Column(name = "fix_version")
    private String fixVersion;

    @Column(name = "story_points")
    private Integer storyPoints;

    @Column(name = "due_date")
    private LocalDate dueDate;

    private String rank;

    @Column(name = "custom_field_values", columnDefinition = "TEXT")
    private String customFieldValues = "{}";

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Issue(UUID tenantId, UUID projectId, UUID issueTypeId, UUID statusId, UUID reporterId, String summary) {
        this.tenantId = tenantId;
        this.projectId = projectId;
        this.issueTypeId = issueTypeId;
        this.statusId = statusId;
        this.reporterId = reporterId;
        this.summary = summary;
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
