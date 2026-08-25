package io.trackforge.common.security;

import io.trackforge.auth.model.OrgRole;
import io.trackforge.project.model.ProjectMembership;
import io.trackforge.project.repository.ProjectMembershipRepository;
import java.io.Serializable;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
 * Method-level security evaluator (Feature Ticket [F2-03], Security & Access
 * Document §3.2). Resolves whether the authenticated user has a project-level
 * permission. For v1, built-in role-to-permission mappings are hardcoded; v2
 * will read from the {@code roles} table once custom permission schemes land.
 */
@Component
public class TrackForgePermissionEvaluator implements PermissionEvaluator {

    private static final Map<String, Set<String>> BUILT_IN_ROLES = Map.of(
            "OrgAdmin", Set.of(
                    "CREATE_PROJECT", "ADMINISTER_PROJECT", "CREATE_ISSUE", "EDIT_ISSUE",
                    "DELETE_ISSUE", "VIEW_PROJECT", "MANAGE_SPRINTS"),
            "ProjectAdmin", Set.of(
                    "ADMINISTER_PROJECT", "CREATE_ISSUE", "EDIT_ISSUE", "DELETE_ISSUE",
                    "VIEW_PROJECT", "MANAGE_SPRINTS"),
            "ProjectMember", Set.of(
                    "CREATE_ISSUE", "EDIT_ISSUE", "VIEW_PROJECT"),
            "ProjectViewer", Set.of(
                    "VIEW_PROJECT"));

    private final ProjectMembershipRepository projectMembershipRepository;

    public TrackForgePermissionEvaluator(ProjectMembershipRepository projectMembershipRepository) {
        this.projectMembershipRepository = projectMembershipRepository;
    }

    @Override
    public boolean hasPermission(Authentication auth, Object targetDomain, Object permission) {
        if (auth == null || !(auth.getPrincipal() instanceof TrackForgePrincipal principal)) {
            return false;
        }

        // Org Admins and Billing Admins bypass project-level checks.
        if (principal.orgRole() == OrgRole.ORG_ADMIN || principal.orgRole() == OrgRole.BILLING_ADMIN) {
            return true;
        }

        String effectiveRole = effectiveRole(principal, targetDomain);
        Set<String> permissions = BUILT_IN_ROLES.get(effectiveRole);
        return permissions != null && permissions.contains(String.valueOf(permission));
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable targetId, String targetType, Object permission) {
        return hasPermission(auth, (Object) targetId, permission);
    }

    private String effectiveRole(TrackForgePrincipal principal, Object targetId) {
        if (targetId instanceof UUID projectId) {
            return projectMembershipRepository.findByProjectIdAndUserId(projectId, principal.userId())
                    .map(ProjectMembership::getRoleName)
                    .orElse(null);
        }
        return null;
    }
}
