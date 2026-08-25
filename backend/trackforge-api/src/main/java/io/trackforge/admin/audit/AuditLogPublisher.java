package io.trackforge.admin.audit;

import io.trackforge.admin.model.AuditLog;
import io.trackforge.admin.repository.AuditLogRepository;
import io.trackforge.common.tenant.TenantContext;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class AuditLogPublisher {

    private static final Logger log = LoggerFactory.getLogger(AuditLogPublisher.class);
    private static final String TOPIC = "trackforge.audit";

    private final AuditLogRepository auditLogRepository;
    private final KafkaTemplate<String, AuditLogEvent> kafkaTemplate;
    private final boolean kafkaEnabled;

    public AuditLogPublisher(
            AuditLogRepository auditLogRepository,
            KafkaTemplate<String, AuditLogEvent> kafkaTemplate,
            @Value("${trackforge.kafka.enabled:false}") boolean kafkaEnabled) {
        this.auditLogRepository = auditLogRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.kafkaEnabled = kafkaEnabled;
    }

    public void emit(UUID tenantId, UUID actorUserId, String action, String entityType, UUID entityId, Object before, Object after) {
        AuditLogEvent event = new AuditLogEvent(
                tenantId, actorUserId, action, entityType, entityId,
                toJson(before), toJson(after), null, null, java.time.Instant.now());

        // Always write the canonical record to Postgres for the audit log UI.
        TenantContext.set(tenantId);
        try {
            AuditLog logEntry = new AuditLog(tenantId, actorUserId, action, entityType, entityId);
            logEntry.setBeforeState(event.beforeState());
            logEntry.setAfterState(event.afterState());
            auditLogRepository.save(logEntry);
        } finally {
            TenantContext.clear();
        }

        if (kafkaEnabled) {
            try {
                kafkaTemplate.send(TOPIC, tenantId.toString(), event)
                        .whenComplete((r, ex) -> {
                            if (ex != null) log.warn("Audit Kafka send failed", ex);
                        });
            } catch (Exception e) {
                log.warn("Audit Kafka send failed", e);
            }
        }
    }

    private String toJson(Object value) {
        if (value == null) return null;
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(value);
        } catch (Exception e) {
            return value.toString();
        }
    }
}
