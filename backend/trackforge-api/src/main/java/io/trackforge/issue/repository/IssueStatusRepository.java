package io.trackforge.issue.repository;

import io.trackforge.issue.model.IssueStatus;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueStatusRepository extends JpaRepository<IssueStatus, UUID> {

    Optional<IssueStatus> findByNameIgnoreCase(String name);
}
