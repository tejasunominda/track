package io.trackforge.admin.controller;

import io.trackforge.admin.dto.AuditLogResponse;
import io.trackforge.admin.service.AuditLogService;
import io.trackforge.common.security.TrackForgePrincipal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/audit-log")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public ResponseEntity<List<AuditLogResponse>> list(@AuthenticationPrincipal TrackForgePrincipal principal) {
        return ResponseEntity.ok(auditLogService.listByTenant(principal.tenantId()));
    }
}
