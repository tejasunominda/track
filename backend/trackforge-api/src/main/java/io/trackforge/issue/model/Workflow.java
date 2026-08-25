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
@Table(name = "workflows")
@Getter
@Setter
@NoArgsConstructor
public class Workflow {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "project_id")
    private UUID projectId;

    @Column(nullable = false)
    private String name;

    public Workflow(UUID tenantId, UUID projectId, String name) {
        this.tenantId = tenantId;
        this.projectId = projectId;
        this.name = name;
    }
}
