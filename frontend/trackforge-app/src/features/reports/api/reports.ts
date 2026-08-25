import { apiFetch } from "@/api/client";

export interface Velocity {
  sprintId: string;
  sprintName: string;
  committed: number;
  completed: number;
}

export interface Burndown {
  totalStoryPoints: number;
  remainingStoryPoints: number;
  completedStoryPoints: number;
}

export async function fetchVelocity(projectId: string): Promise<Velocity[]> {
  return apiFetch<Velocity[]>(`/reports/velocity?projectId=${projectId}`);
}

export async function fetchBurndown(sprintId: string): Promise<Burndown> {
  return apiFetch<Burndown>(`/reports/burndown/${sprintId}`);
}
