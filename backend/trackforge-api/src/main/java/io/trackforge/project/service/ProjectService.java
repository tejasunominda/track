package io.trackforge.project.service;

import io.trackforge.admin.audit.AuditLogPublisher;
import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.common.tenant.TenantContext;
import io.trackforge.project.dto.CreateProjectRequest;
import io.trackforge.project.dto.ProjectSummaryResponse;
import io.trackforge.project.model.Project;
import io.trackforge.project.model.ProjectMembership;
import io.trackforge.project.model.ProjectStatus;
import io.trackforge.project.model.ProjectTemplate;
import io.trackforge.project.repository.ProjectMembershipRepository;
import io.trackforge.project.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMembershipRepository projectMembershipRepository;
    private final AuditLogPublisher auditLogPublisher;

    public ProjectService(ProjectRepository projectRepository, ProjectMembershipRepository projectMembershipRepository, AuditLogPublisher auditLogPublisher) {
        this.projectRepository = projectRepository;
        this.projectMembershipRepository = projectMembershipRepository;
        this.auditLogPublisher = auditLogPublisher;
    }

    @Transactional(readOnly = true)
    public List<ProjectSummaryResponse> listActiveProjects() {
        return projectRepository.findByStatusOrderByNameAsc(ProjectStatus.ACTIVE).stream()
                .map(this::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<ProjectSummaryResponse> getProject(UUID id) {
        return projectRepository.findById(id).map(this::toSummary);
    }

    @Transactional
    public ProjectSummaryResponse createProject(CreateProjectRequest request) {
        TrackForgePrincipal principal = currentPrincipal();
        if (projectRepository.existsByProjectKeyIgnoreCase(request.projectKey())) {
            throw new io.trackforge.common.exception.ConflictException(
                    "PROJECT_KEY_TAKEN", "A project with that key already exists in this workspace.");
        }

        Project project = new Project(principal.tenantId(), request.name(), request.projectKey(), request.template());
        if (request.description() != null) {
            project.setDescription(request.description());
        }
        project.setLeadUserId(principal.userId());

        Project saved = projectRepository.save(project);
        // Creator becomes the first ProjectAdmin automatically.
        projectMembershipRepository.save(new ProjectMembership(
                principal.tenantId(), saved.getId(), principal.userId(), "ProjectAdmin"));
        auditLogPublisher.emit(saved.getTenantId(), principal.userId(), "CREATE", "Project", saved.getId(), null, saved);
        return toSummary(saved);
    }

    @Transactional
    public ProjectSummaryResponse archiveProject(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new io.trackforge.common.exception.NotFoundException(
                        "PROJECT_NOT_FOUND", "Project not found or access denied."));
        project.setStatus(ProjectStatus.ARCHIVED);
        return toSummary(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new io.trackforge.common.exception.NotFoundException(
                        "PROJECT_NOT_FOUND", "Project not found or access denied."));
        project.setStatus(ProjectStatus.DELETED);
        projectRepository.save(project);
    }

    private ProjectSummaryResponse toSummary(Project project) {
        return new ProjectSummaryResponse(
                project.getId(),
                project.getName(),
                project.getProjectKey(),
                project.getDescription(),
                project.getTemplate(),
                project.getStatus(),
                project.getCreatedAt(),
                project.getUpdatedAt());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
