import { apiFetch } from "@/api/client";

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal?: string | null;
  status: "PLANNED" | "ACTIVE" | "CLOSED";
  startDate?: string | null;
  endDate?: string | null;
}

export async function listSprints(projectId: string): Promise<Sprint[]> {
  return apiFetch<Sprint[]>(`/sprints?projectId=${projectId}`);
}

export async function createSprint(projectId: string, data: { name: string; goal?: string; startDate?: string; endDate?: string }): Promise<Sprint> {
  return apiFetch<Sprint>("/sprints", {
    method: "POST",
    body: JSON.stringify({ ...data, projectId }),
  });
}

export async function startSprint(id: string): Promise<Sprint> {
  return apiFetch<Sprint>(`/sprints/${id}/start`, { method: "POST" });
}

export async function completeSprint(id: string): Promise<Sprint> {
  return apiFetch<Sprint>(`/sprints/${id}/complete`, { method: "POST" });
}
