import { apiFetch } from "@/api/client";
import { ProjectTemplate } from "../types/project";

export interface ProjectSummary {
  id: string;
  name: string;
  projectKey: string;
  description: string | null;
  template: ProjectTemplate;
  status: "ACTIVE" | "ARCHIVED" | "DELETED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  projectKey: string;
  description: string;
  template: ProjectTemplate;
}

export function listProjects(): Promise<ProjectSummary[]> {
  return apiFetch("/projects");
}

export function createProject(req: CreateProjectRequest): Promise<ProjectSummary> {
  return apiFetch("/projects", { method: "POST", body: JSON.stringify(req) });
}
