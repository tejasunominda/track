package io.trackforge.auth.service;

import io.trackforge.auth.dto.BillingStatusResponse;
import io.trackforge.auth.model.Organization;
import io.trackforge.auth.model.SubscriptionTier;
import io.trackforge.auth.repository.OrganizationRepository;
import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import java.util.Map;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BillingService {

    private final OrganizationRepository organizationRepository;

    public BillingService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Transactional(readOnly = true)
    public BillingStatusResponse status(UUID tenantId) {
        Organization org = organizationRepository.findById(tenantId)
                .orElseThrow(() -> new NotFoundException("ORGANIZATION_NOT_FOUND", "Organization not found."));
        return forTier(org.getTier());
    }

    public BillingStatusResponse forTier(SubscriptionTier tier) {
        return switch (tier) {
            case FREE -> new BillingStatusResponse(tier, 1, 5,
                    Map.of("sso", false, "auditLog", false, "advancedSearch", false, "dashboards", false, "portfolios", false));
            case STANDARD -> new BillingStatusResponse(tier, 10, 50,
                    Map.of("sso", false, "auditLog", true, "advancedSearch", false, "dashboards", true, "portfolios", false));
            case PREMIUM -> new BillingStatusResponse(tier, 100, 500,
                    Map.of("sso", true, "auditLog", true, "advancedSearch", true, "dashboards", true, "portfolios", true));
            case ENTERPRISE -> new BillingStatusResponse(tier, Integer.MAX_VALUE, Integer.MAX_VALUE,
                    Map.of("sso", true, "auditLog", true, "advancedSearch", true, "dashboards", true, "portfolios", true));
        };
    }

    @Transactional(readOnly = true)
    public boolean isFeatureEnabled(UUID tenantId, String feature) {
        Organization org = organizationRepository.findById(tenantId).orElse(null);
        if (org == null) return false;
        return forTier(org.getTier()).features().getOrDefault(feature, false);
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
