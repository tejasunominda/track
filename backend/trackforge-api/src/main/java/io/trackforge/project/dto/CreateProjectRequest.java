package io.trackforge.project.dto;

import io.trackforge.project.model.ProjectTemplate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateProjectRequest(
        @NotBlank(message = "is required") String name,
        @Size(max = 32, message = "must be 32 characters or less")
        @Pattern(regexp = "^[A-Z][A-Z0-9-]*$", message = "must be an uppercase project key like ENG or PRJ-1")
        String projectKey,
        String description,
        @NotNull(message = "is required") ProjectTemplate template) {
}
