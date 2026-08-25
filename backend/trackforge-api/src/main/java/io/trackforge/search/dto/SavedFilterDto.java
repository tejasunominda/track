package io.trackforge.search.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public record SavedFilterDto(
        UUID id,
        @NotBlank String name,
        @NotBlank String query) {
}
