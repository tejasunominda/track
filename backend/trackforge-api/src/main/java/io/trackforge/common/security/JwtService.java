package io.trackforge.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.trackforge.auth.model.OrgRole;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Issues and validates short-lived JWT access tokens (Security & Access
 * Document §2.1). Claims carry the tenant id so {@code JwtAuthenticationFilter}
 * can populate {@link io.trackforge.common.tenant.TenantContext} without an
 * extra DB round-trip per request.
 */
@Component
public class JwtService {

    private final Key signingKey;
    private final String issuer;
    private final Duration accessTokenTtl;

    public JwtService(
            @Value("${trackforge.jwt.secret:${JWT_SECRET:dev-only-insecure-secret-change-me-0123456789abcdef}}") String secret,
            @Value("${trackforge.jwt.issuer}") String issuer,
            @Value("${trackforge.jwt.access-token-ttl-minutes}") long accessTokenTtlMinutes) {
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        this.issuer = issuer;
        this.accessTokenTtl = Duration.ofMinutes(accessTokenTtlMinutes);
    }

    public String issueAccessToken(UUID userId, UUID tenantId, String email, OrgRole orgRole) {
        Instant now = Instant.now();
        return Jwts.builder()
                .issuer(issuer)
                .subject(userId.toString())
                .claim("tenantId", tenantId.toString())
                .claim("email", email)
                .claim("orgRole", orgRole.name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(accessTokenTtl)))
                .signWith(signingKey)
                .compact();
    }

    public Optional<TrackForgePrincipal> parse(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith((javax.crypto.SecretKey) signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return Optional.of(new TrackForgePrincipal(
                    UUID.fromString(claims.getSubject()),
                    UUID.fromString(claims.get("tenantId", String.class)),
                    claims.get("email", String.class),
                    OrgRole.valueOf(claims.get("orgRole", String.class))));
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    public long accessTokenTtlSeconds() {
        return accessTokenTtl.getSeconds();
    }
}
