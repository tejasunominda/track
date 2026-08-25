package io.trackforge.issue.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "attachments")
@Getter
@Setter
@NoArgsConstructor
public class Attachment {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "issue_id", nullable = false)
    private UUID issueId;

    @Column(name = "uploaded_by", nullable = false)
    private UUID uploadedBy;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "storage_path", nullable = false)
    private String storagePath;

    @Column(name = "size_bytes")
    private Long sizeBytes;

    @Column(name = "scan_status", nullable = false, length = 32)
    private String scanStatus = "PENDING";

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Attachment(UUID tenantId, UUID issueId, UUID uploadedBy, String fileName, String contentType, String storagePath, long sizeBytes) {
        this.tenantId = tenantId;
        this.issueId = issueId;
        this.uploadedBy = uploadedBy;
        this.fileName = fileName;
        this.contentType = contentType;
        this.storagePath = storagePath;
        this.sizeBytes = sizeBytes;
    }

    @jakarta.persistence.PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }
}
