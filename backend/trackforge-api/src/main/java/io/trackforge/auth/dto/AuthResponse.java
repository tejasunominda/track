package io.trackforge.auth.dto;

/**
 * Returned by signup/login/refresh: a short-lived access token plus a
 * rotating opaque refresh token (Security & Access Document §2.1).
 */
public record AuthResponse(String accessToken, String refreshToken, long expiresInSeconds) {
}
