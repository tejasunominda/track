package io.trackforge.admin.repository;

import io.trackforge.admin.model.AuditLog;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

    List<AuditLog> findByTenantIdOrderByCreatedAtDesc(UUID tenantId);
}
