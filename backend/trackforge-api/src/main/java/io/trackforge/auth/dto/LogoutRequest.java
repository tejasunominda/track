package io.trackforge.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record LogoutRequest(@NotBlank(message = "is required") String refreshToken) {
}
