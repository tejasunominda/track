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
                        a.getEntityId(), a.getBeforeState(), a.getAfterState(), a.getCreatedAt()))
                .toList();
    }

    @Transactional(readOnly = true)
    public String exportCsv(UUID tenantId) {
        List<io.trackforge.admin.model.AuditLog> logs = auditLogRepository.findByTenantIdOrderByCreatedAtDesc(tenantId);
        StringBuilder sb = new StringBuilder("id,actorUserId,action,entityType,entityId,beforeState,afterState,createdAt\n");
        for (io.trackforge.admin.model.AuditLog a : logs) {
            sb.append(escape(a.getId())).append(",")
              .append(escape(a.getActorUserId())).append(",")
              .append(escape(a.getAction())).append(",")
              .append(escape(a.getEntityType())).append(",")
              .append(escape(a.getEntityId())).append(",")
              .append(escape(a.getBeforeState())).append(",")
              .append(escape(a.getAfterState())).append(",")
              .append(a.getCreatedAt()).append("\n");
        }
        return sb.toString();
    }

    private String escape(Object value) {
        if (value == null) return "";
        String s = value.toString();
        if (s.contains(",") || s.contains("\"") || s.contains("\n")) {
            return "\"" + s.replace("\"", "\"\"") + "\"";
        }
        return s;
    }
}
