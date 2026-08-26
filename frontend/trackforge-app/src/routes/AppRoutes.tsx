import { Routes, Route, Navigate } from "react-router-dom";
import { TeamsPage } from "@/features/teams/pages/TeamsPage";
import { GoalsPage } from "@/features/goals/pages/GoalsPage";
import { FormsPage } from "@/features/forms/pages/FormsPage";
import { AssetsPage } from "@/features/assets/pages/AssetsPage";
import { CalendarPage } from "@/features/calendar/pages/CalendarPage";
import { TimelinePage } from "@/features/timeline/pages/TimelinePage";
import { DependenciesPage } from "@/features/dependencies/pages/DependenciesPage";
import { ApprovalsPage } from "@/features/approvals/pages/ApprovalsPage";
import { AnnouncementsPage } from "@/features/announcements/pages/AnnouncementsPage";
import { TemplatesPage } from "@/features/templates/pages/TemplatesPage";
import { ReportsExportPage } from "@/features/reports-export/pages/ReportsExportPage";
import { RuleEnginePage } from "@/features/rule-engine/pages/RuleEnginePage";
import { RolesPage } from "@/features/roles/pages/RolesPage";
import { GroupsPage } from "@/features/groups/pages/GroupsPage";
import { InvitationsPage } from "@/features/invitations/pages/InvitationsPage";
import { SecurityPage } from "@/features/security/pages/SecurityPage";
import { WebhooksPage } from "@/features/webhooks/pages/WebhooksPage";
import { AuditTrailPage } from "@/features/audit-trail/pages/AuditTrailPage";
import { MigratePage } from "@/features/migrate/pages/MigratePage";
import { AnalyticsPage } from "@/features/analytics/pages/AnalyticsPage";
import { LabelsPage } from "@/features/labels/pages/LabelsPage";
import { ComponentsPage } from "@/features/components/pages/ComponentsPage";
import { ReleasesPage } from "@/features/releases/pages/ReleasesPage";
import { WorkflowsPage } from "@/features/workflows/pages/WorkflowsPage";
import { IssueTypesPage } from "@/features/issue-types/pages/IssueTypesPage";
import { PermissionsPage } from "@/features/permissions/pages/PermissionsPage";
import { BillingPage } from "@/features/billing/pages/BillingPage";
import { IntegrationsPage } from "@/features/integrations/pages/IntegrationsPage";
import { ServiceDeskPage } from "@/features/service-desk/pages/ServiceDeskPage";
import { PortfolioPage } from "@/features/portfolio/pages/PortfolioPage";
import { RoadmapPage } from "@/features/roadmap/pages/RoadmapPage";
import { EpicsPage } from "@/features/epics/pages/EpicsPage";
import { VersionsPage } from "@/features/versions/pages/VersionsPage";
import { TimeTrackingPage } from "@/features/time-tracking/pages/TimeTrackingPage";
import { SLAPage } from "@/features/s-l-a/pages/SLAPage";
import { CustomFieldsPage } from "@/features/custom-fields/pages/CustomFieldsPage";
import { AutomationPage } from "@/features/automation/pages/AutomationPage";
import { ImportPage } from "@/features/import/pages/ImportPage";
import { ExportPage } from "@/features/export/pages/ExportPage";
import { ArchivePage } from "@/features/archive/pages/ArchivePage";
import { AppShell } from "@/app/AppShell";
import { AuditLogPage } from "@/features/admin/pages/AuditLogPage";
import { BacklogPage } from "@/features/backlog/pages/BacklogPage";
import { BoardPage } from "@/features/board/pages/BoardPage";
import { DashboardsPage } from "@/features/dashboards/pages/DashboardsPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { FiltersPage } from "@/features/filters/pages/FiltersPage";
import { HelpPage } from "@/features/help/pages/HelpPage";
import { IssueDetailPage } from "@/features/issues/pages/IssueDetailPage";
import { IssuesPage } from "@/features/issues/pages/IssuesPage";
import { NotificationsPage } from "@/features/notifications/pages/NotificationsPage";
import { PeoplePage } from "@/features/people/pages/PeoplePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { SearchPage } from "@/features/search/pages/SearchPage";
import { SettingsPage } from "@/features/settings/pages/SettingsPage";
import { SprintsPage } from "@/features/sprints/pages/SprintsPage";

/**
 * Top-level route tree, nested to match the project/board/issue hierarchy
 * (Frontend Specification Document §8). Feature modules under src/features/*
 * register their own sub-routes here as they are built out per the
 * Feature Ticket List.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/projects" replace />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:projectId/board" element={<BoardPage />} />
        <Route path="projects/:projectId/issues" element={<IssuesPage />} />
        <Route path="projects/:projectId/reports" element={<ReportsPage />} />
        <Route path="projects/:projectId/backlog" element={<BacklogPage />} />
        <Route path="projects/:projectId/sprints" element={<SprintsPage />} />
        <Route path="filters" element={<FiltersPage />} />
        <Route path="dashboards" element={<DashboardsPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="admin/audit-log" element={<AuditLogPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="labels" element={<LabelsPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="releases" element={<ReleasesPage />} />
        <Route path="workflows" element={<WorkflowsPage />} />
        <Route path="issue-types" element={<IssueTypesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="service-desk" element={<ServiceDeskPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="epics" element={<EpicsPage />} />
        <Route path="versions" element={<VersionsPage />} />
        <Route path="time-tracking" element={<TimeTrackingPage />} />
        <Route path="s-l-a" element={<SLAPage />} />
        <Route path="custom-fields" element={<CustomFieldsPage />} />
        <Route path="automation" element={<AutomationPage />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="export" element={<ExportPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="issues/:issueId" element={<IssueDetailPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="dependencies" element={<DependenciesPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="reports-export" element={<ReportsExportPage />} />
        <Route path="rule-engine" element={<RuleEnginePage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="invitations" element={<InvitationsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="webhooks" element={<WebhooksPage />} />
        <Route path="audit-trail" element={<AuditTrailPage />} />
        <Route path="migrate" element={<MigratePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}
