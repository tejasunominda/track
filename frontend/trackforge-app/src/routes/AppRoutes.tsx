import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";

/**
 * Top-level route tree, nested to match the project/board/issue hierarchy
 * (Frontend Specification Document §8). Feature modules under src/features/*
 * register their own sub-routes here as they are built out per the
 * Feature Ticket List.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/projects" replace />} />
        <Route path="projects" element={<ProjectsPage />} />
        {/* <Route path="projects/:projectKey/board" element={<BoardView />} /> */}
        {/* <Route path="projects/:projectKey/backlog" element={<BacklogView />} /> */}
      </Route>
    </Routes>
  );
}
