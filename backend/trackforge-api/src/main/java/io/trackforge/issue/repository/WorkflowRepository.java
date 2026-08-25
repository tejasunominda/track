package io.trackforge.issue.repository;

import io.trackforge.issue.model.Workflow;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<Workflow, UUID> {

    List<Workflow> findByProjectId(UUID projectId);
}
