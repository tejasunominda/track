package io.trackforge.auth.dto;

import io.trackforge.auth.model.SubscriptionTier;
import java.util.Map;

public record BillingStatusResponse(
        SubscriptionTier tier,
        int projectLimit,
        int userLimit,
        Map<String, Boolean> features) {
}
