package io.trackforge.dashboard.service;

import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.dashboard.dto.DashboardDto;
import io.trackforge.dashboard.model.Dashboard;
import io.trackforge.dashboard.repository.DashboardRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public DashboardService(DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    @Transactional(readOnly = true)
    public List<DashboardDto> list() {
        return dashboardRepository.findByOrderByNameAsc().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public DashboardDto create(String name, String widgets) {
        TrackForgePrincipal principal = currentPrincipal();
        Dashboard dashboard = new Dashboard(principal.tenantId(), name);
        dashboard.setWidgets(widgets != null ? widgets : "[]");
        return toDto(dashboardRepository.save(dashboard));
    }

    @Transactional
    public DashboardDto update(UUID id, String name, String widgets) {
        Dashboard dashboard = dashboardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DASHBOARD_NOT_FOUND", "Dashboard not found."));
        if (name != null) dashboard.setName(name);
        if (widgets != null) dashboard.setWidgets(widgets);
        return toDto(dashboardRepository.save(dashboard));
    }

    @Transactional
    public void delete(UUID id) {
        dashboardRepository.deleteById(id);
    }

    private DashboardDto toDto(Dashboard d) {
        return new DashboardDto(d.getId(), d.getName(), d.getWidgets());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
