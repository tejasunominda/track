-- V11__billing.sql
-- Feature Ticket [F18-01]: subscription tiers and limits.

ALTER TABLE organizations ADD COLUMN subscription_tier VARCHAR(32) NOT NULL DEFAULT 'FREE';
