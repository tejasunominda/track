package io.trackforge.auth.model;

/**
 * Tenant billing/subscription tier (PRD §5). Enterprise-only features
 * (SSO/SAML, audit log export, issue-level security) are feature-gated
 * against this value.
 */
public enum SubscriptionTier {
    FREE,
    STANDARD,
    PREMIUM,
    ENTERPRISE
}
