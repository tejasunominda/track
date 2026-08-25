package io.trackforge.issue.repository;

import io.trackforge.issue.model.Issue;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, UUID> {

    List<Issue> findByProjectIdOrderByRankAsc(UUID projectId);

    List<Issue> findByProjectIdAndStatusIdIn(UUID projectId, List<UUID> statusIds);
}
