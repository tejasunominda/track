package io.trackforge.common.security;

import io.trackforge.auth.model.OrgRole;
import java.util.UUID;

/**
 * Authenticated principal derived from a validated JWT access token: the
 * user id, their tenant, and their global org role. Bound into Spring
 * Security's {@code SecurityContext} by {@link JwtAuthenticationFilter}.
 */
public record TrackForgePrincipal(UUID userId, UUID tenantId, String email, OrgRole orgRole) {
}
