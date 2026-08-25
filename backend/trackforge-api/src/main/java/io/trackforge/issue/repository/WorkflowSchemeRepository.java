package io.trackforge.issue.repository;

import io.trackforge.issue.model.WorkflowScheme;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowSchemeRepository extends JpaRepository<WorkflowScheme, UUID> {

    Optional<WorkflowScheme> findByProjectIdAndIssueTypeId(UUID projectId, UUID issueTypeId);
}
