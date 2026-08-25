package io.trackforge.issue.repository;

import io.trackforge.issue.model.IssueType;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueTypeRepository extends JpaRepository<IssueType, UUID> {

    Optional<IssueType> findByNameIgnoreCase(String name);
}
