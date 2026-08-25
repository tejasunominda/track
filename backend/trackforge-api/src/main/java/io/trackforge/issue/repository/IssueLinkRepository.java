package io.trackforge.issue.repository;

import io.trackforge.issue.model.IssueLink;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueLinkRepository extends JpaRepository<IssueLink, UUID> {

    List<IssueLink> findBySourceIdOrTargetId(UUID sourceId, UUID targetId);
}
