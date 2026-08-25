package io.trackforge.admin.service;

import io.trackforge.admin.dto.AuditLogResponse;
import io.trackforge.admin.repository.AuditLogRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional(readOnly = true)
    public List<AuditLogResponse> listByTenant(UUID tenantId) {
        return auditLogRepository.findByTenantIdOrderByCreatedAtDesc(tenantId).stream()
                .map(a -> new AuditLogResponse(
                        a.getId(), a.getActorUserId(), a.getAction(), a.getEntityType(),
                        a.getEntityId(), a.getCreatedAt()))
                .toList();
    }
}
