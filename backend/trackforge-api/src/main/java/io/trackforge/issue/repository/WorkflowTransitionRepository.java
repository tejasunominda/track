package io.trackforge.issue.repository;

import io.trackforge.issue.model.WorkflowTransition;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowTransitionRepository extends JpaRepository<WorkflowTransition, UUID> {

    Optional<WorkflowTransition> findByWorkflowIdAndFromStatusIdAndToStatusId(
            UUID workflowId, UUID fromStatusId, UUID toStatusId);

    List<WorkflowTransition> findByWorkflowId(UUID workflowId);
}
