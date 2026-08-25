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
@Table(name = "workflow_schemes")
@Getter
@Setter
@NoArgsConstructor
public class WorkflowScheme {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "issue_type_id", nullable = false)
    private UUID issueTypeId;

    @Column(name = "workflow_id", nullable = false)
    private UUID workflowId;

    public WorkflowScheme(UUID tenantId, UUID projectId, UUID issueTypeId, UUID workflowId) {
        this.tenantId = tenantId;
        this.projectId = projectId;
        this.issueTypeId = issueTypeId;
        this.workflowId = workflowId;
    }
}
