package io.trackforge.project.model;

/**
 * Initial project type (PRD §4.1). Determines the default workflow scheme
 * and board type at project creation time; Epic 4 seeds the actual
 * workflow statuses/transitions.
 */
public enum ProjectTemplate {
    SCRUM,
    KANBAN,
    BUSINESS
}
