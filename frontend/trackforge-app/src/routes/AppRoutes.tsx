import { Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="issues/:issueId" element={<IssueDetailPage />} />
      </Route>
    </Routes>
  );
}
