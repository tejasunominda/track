package io.trackforge.auth.repository;

import io.trackforge.auth.model.Organization;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

    Optional<Organization> findBySubdomain(String subdomain);

    boolean existsBySubdomain(String subdomain);
}
