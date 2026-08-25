package io.trackforge.project.repository;

import io.trackforge.project.model.Project;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Scoped implicitly by Postgres RLS to the current tenant context; the
 * repository interface itself contains no explicit tenant filtering.
 */
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByStatusOrderByNameAsc(io.trackforge.project.model.ProjectStatus status);

    Optional<Project> findByProjectKeyIgnoreCase(String projectKey);

    boolean existsByProjectKeyIgnoreCase(String projectKey);
}
