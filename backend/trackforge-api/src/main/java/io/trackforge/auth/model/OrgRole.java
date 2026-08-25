package io.trackforge.auth.model;

/**
 * Global (organization-level) role — tier 1 of the three-tier permission
 * model (Security & Access Document §3.1). Project-scoped roles are modeled
 * separately once Epic 3 (Projects) lands.
 */
public enum OrgRole {
    ORG_ADMIN,
    ORG_MEMBER,
    BILLING_ADMIN
}
