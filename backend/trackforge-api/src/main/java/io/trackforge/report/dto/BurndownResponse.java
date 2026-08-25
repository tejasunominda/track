package io.trackforge.report.dto;

public record BurndownResponse(
        long totalStoryPoints,
        long remainingStoryPoints,
        long completedStoryPoints) {
}
