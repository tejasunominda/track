package io.trackforge.issue.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "issue_statuses")
@Getter
@Setter
@NoArgsConstructor
public class IssueStatus {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_category", nullable = false, length = 32)
    private StatusCategory statusCategory;

    public IssueStatus(UUID tenantId, String name, StatusCategory statusCategory) {
        this.tenantId = tenantId;
        this.name = name;
        this.statusCategory = statusCategory;
    }
}
