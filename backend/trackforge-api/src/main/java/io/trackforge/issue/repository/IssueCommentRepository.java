package io.trackforge.issue.repository;

import io.trackforge.issue.model.IssueComment;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueCommentRepository extends JpaRepository<IssueComment, UUID> {

    List<IssueComment> findByIssueIdOrderByCreatedAtAsc(UUID issueId);
}
