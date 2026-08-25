package io.trackforge.auth.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Login is scoped to a tenant by subdomain (PRD §5: subdomain-based tenant
 * routing) so the server can establish {@code app.current_tenant} before
 * querying the (RLS-protected) membership row.
 */
public record LoginRequest(
        @NotBlank(message = "is required") String subdomain,
        @NotBlank(message = "is required") String email,
        @NotBlank(message = "is required") String password,
        String deviceFingerprint) {
}
