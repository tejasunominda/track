package io.trackforge.sprint.repository;

import io.trackforge.sprint.model.Sprint;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, UUID> {

    List<Sprint> findByProjectIdOrderByStartDateAsc(UUID projectId);

    Optional<Sprint> findByProjectIdAndStatus(UUID projectId, io.trackforge.sprint.model.SprintStatus status);
}
