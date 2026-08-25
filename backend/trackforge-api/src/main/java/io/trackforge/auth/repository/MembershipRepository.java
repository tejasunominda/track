package io.trackforge.auth.repository;

import io.trackforge.auth.model.Membership;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipRepository extends JpaRepository<Membership, UUID> {

    /**
     * Scoped implicitly by Postgres RLS to whatever tenant is set in
     * {@code app.current_tenant} for the current connection — callers must
     * set {@link io.trackforge.common.tenant.TenantContext} first.
     */
    Optional<Membership> findByTenantIdAndUserId(UUID tenantId, UUID userId);

    List<Membership> findByTenantId(UUID tenantId);
}
