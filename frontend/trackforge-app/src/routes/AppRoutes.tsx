import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { BoardPage } from "@/features/board/pages/BoardPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { IssueDetailPage } from "@/features/issues/pages/IssueDetailPage";
import { IssuesPage } from "@/features/issues/pages/IssuesPage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";

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
        <Route path="issues/:issueId" element={<IssueDetailPage />} />
      </Route>
    </Routes>
  );
}
