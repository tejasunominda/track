package io.trackforge.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record RefreshRequest(@NotBlank(message = "is required") String refreshToken, String deviceFingerprint) {
}
