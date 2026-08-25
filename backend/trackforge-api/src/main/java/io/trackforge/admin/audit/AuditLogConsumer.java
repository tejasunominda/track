package io.trackforge.admin.audit;

import io.trackforge.admin.model.AuditLog;
import io.trackforge.admin.repository.AuditLogRepository;
import io.trackforge.common.tenant.TenantContext;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class AuditLogConsumer {

    private final AuditLogRepository auditLogRepository;

    public AuditLogConsumer(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @KafkaListener(topics = "trackforge.audit", groupId = "trackforge-audit-log")
    public void consume(AuditLogEvent event) {
        TenantContext.set(event.tenantId());
        try {
            AuditLog log = new AuditLog(
                    event.tenantId(), event.actorUserId(),
                    event.action(), event.entityType(), event.entityId());
            log.setBeforeState(event.beforeState());
            log.setAfterState(event.afterState());
            log.setIpAddress(event.ipAddress());
            log.setUserAgent(event.userAgent());
            auditLogRepository.save(log);
        } finally {
            TenantContext.clear();
        }
    }
}
