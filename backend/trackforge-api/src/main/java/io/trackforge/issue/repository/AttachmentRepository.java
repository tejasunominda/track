package io.trackforge.issue.repository;

import io.trackforge.issue.model.Attachment;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, UUID> {

    List<Attachment> findByIssueIdOrderByCreatedAtDesc(UUID issueId);
}
