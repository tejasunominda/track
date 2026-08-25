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
@Table(name = "workflow_transitions")
@Getter
@Setter
@NoArgsConstructor
public class WorkflowTransition {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "workflow_id", nullable = false)
    private UUID workflowId;

    @Column(name = "from_status_id", nullable = false)
    private UUID fromStatusId;

    @Column(name = "to_status_id", nullable = false)
    private UUID toStatusId;

    @Column(name = "conditions_json")
    private String conditionsJson = "{}";

    @Column(name = "validators_json")
    private String validatorsJson = "{}";

    @Column(name = "post_functions_json")
    private String postFunctionsJson = "{}";

    public WorkflowTransition(UUID tenantId, UUID workflowId, UUID fromStatusId, UUID toStatusId) {
        this.tenantId = tenantId;
        this.workflowId = workflowId;
        this.fromStatusId = fromStatusId;
        this.toStatusId = toStatusId;
    }
}
