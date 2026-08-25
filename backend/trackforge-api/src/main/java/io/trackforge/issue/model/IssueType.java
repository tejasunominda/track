package io.trackforge.issue.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "issue_types")
@Getter
@Setter
@NoArgsConstructor
public class IssueType {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "hierarchy_level", nullable = false)
    private int hierarchyLevel;

    private String icon;

    private String color;

    public IssueType(UUID tenantId, String name, int hierarchyLevel) {
        this.tenantId = tenantId;
        this.name = name;
        this.hierarchyLevel = hierarchyLevel;
    }
}
