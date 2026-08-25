package io.trackforge.search.service;

import io.trackforge.common.exception.NotFoundException;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.search.dto.SavedFilterDto;
import io.trackforge.search.model.SavedFilter;
import io.trackforge.search.repository.SavedFilterRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SavedFilterService {

    private final SavedFilterRepository savedFilterRepository;

    public SavedFilterService(SavedFilterRepository savedFilterRepository) {
        this.savedFilterRepository = savedFilterRepository;
    }

    @Transactional(readOnly = true)
    public List<SavedFilterDto> listForUser() {
        TrackForgePrincipal principal = currentPrincipal();
        return savedFilterRepository.findByCreatedByOrderByCreatedAtDesc(principal.userId()).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public SavedFilterDto create(SavedFilterDto dto) {
        TrackForgePrincipal principal = currentPrincipal();
        SavedFilter saved = savedFilterRepository.save(new SavedFilter(
                principal.tenantId(), principal.userId(), dto.name(), dto.query()));
        return toDto(saved);
    }

    @Transactional
    public SavedFilterDto update(UUID id, SavedFilterDto dto) {
        TrackForgePrincipal principal = currentPrincipal();
        SavedFilter filter = savedFilterRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("FILTER_NOT_FOUND", "Filter not found."));
        if (!filter.getCreatedBy().equals(principal.userId())) {
            throw new AccessDeniedException("Can only edit your own filters");
        }
        filter.setName(dto.name());
        filter.setQuery(dto.query());
        return toDto(savedFilterRepository.save(filter));
    }

    @Transactional
    public void delete(UUID id) {
        TrackForgePrincipal principal = currentPrincipal();
        SavedFilter filter = savedFilterRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("FILTER_NOT_FOUND", "Filter not found."));
        if (!filter.getCreatedBy().equals(principal.userId())) {
            throw new AccessDeniedException("Can only delete your own filters");
        }
        savedFilterRepository.delete(filter);
    }

    private SavedFilterDto toDto(SavedFilter f) {
        return new SavedFilterDto(f.getId(), f.getName(), f.getQuery());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
