package io.trackforge.dashboard.repository;

import io.trackforge.dashboard.model.Dashboard;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardRepository extends JpaRepository<Dashboard, UUID> {

    List<Dashboard> findByOrderByNameAsc();
}
