package io.trackforge.search.repository;

import io.trackforge.search.model.SavedFilter;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedFilterRepository extends JpaRepository<SavedFilter, UUID> {

    List<SavedFilter> findByCreatedByOrderByCreatedAtDesc(UUID createdBy);
}
