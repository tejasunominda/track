package io.trackforge.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Org signup payload (Feature Ticket [F1-04]): provisions a new tenant plus
 * its first Org Admin user in one call.
 */
public record SignupRequest(
        @NotBlank(message = "is required") String organizationName,
        @NotBlank(message = "is required")
        @Pattern(regexp = "^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$", message = "must be a lowercase, hyphenated subdomain")
        String subdomain,
        @NotBlank(message = "is required") @Email(message = "must be a valid email") String email,
        @NotBlank(message = "is required") @Size(min = 12, message = "must be at least 12 characters") String password,
        @NotBlank(message = "is required") String displayName) {
}
