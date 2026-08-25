package io.trackforge.report.service;

import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import io.trackforge.project.model.Project;
import io.trackforge.project.repository.ProjectRepository;
import io.trackforge.report.dto.RoadmapItem;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PortfolioService {

    private final IssueRepository issueRepository;
    private final IssueTypeRepository issueTypeRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final ProjectRepository projectRepository;

    public PortfolioService(
            IssueRepository issueRepository,
            IssueTypeRepository issueTypeRepository,
            IssueStatusRepository issueStatusRepository,
            ProjectRepository projectRepository) {
        this.issueRepository = issueRepository;
        this.issueTypeRepository = issueTypeRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<RoadmapItem> roadmap() {
        Optional<IssueType> epicType = issueTypeRepository.findByNameIgnoreCase("Epic");
        if (epicType.isEmpty()) {
            return List.of();
        }

        List<Issue> epics = issueRepository.findByIssueTypeId(epicType.get().getId());
        List<Project> projects = projectRepository.findByStatusOrderByNameAsc(io.trackforge.project.model.ProjectStatus.ACTIVE);
        Map<UUID, String> projectNames = projects.stream().collect(Collectors.toMap(Project::getId, Project::getName));

        List<UUID> statusIds = epics.stream().map(Issue::getStatusId).distinct().toList();
        Map<UUID, String> statusNames = issueStatusRepository.findAllById(statusIds).stream()
                .collect(Collectors.toMap(IssueStatus::getId, IssueStatus::getName));

        return epics.stream()
                .filter(i -> projectNames.containsKey(i.getProjectId()))
                .map(i -> new RoadmapItem(
                        i.getId(),
                        i.getSummary(),
                        i.getSummary(),
                        i.getProjectId(),
                        projectNames.get(i.getProjectId()),
                        statusNames.getOrDefault(i.getStatusId(), "Unknown"),
                        i.getCreatedAt(),
                        i.getDueDate() != null ? i.getDueDate().atStartOfDay(ZoneOffset.UTC).toInstant() : null))
                .toList();
    }
}
