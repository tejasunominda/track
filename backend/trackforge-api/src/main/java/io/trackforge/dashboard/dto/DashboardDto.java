package io.trackforge.dashboard.dto;

import java.util.UUID;

public record DashboardDto(UUID id, String name, String widgets) {
}
