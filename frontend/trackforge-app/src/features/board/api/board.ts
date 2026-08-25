import { apiFetch } from "@/api/client";
import { BoardState } from "@/features/board/types/board";

export async function fetchBoard(projectId: string): Promise<BoardState> {
  return apiFetch<BoardState>(`/projects/${projectId}/board`);
}

export async function moveIssue(
  issueId: string,
  newStatusId: string,
  afterIssueId?: string
): Promise<void> {
  await apiFetch(`/issues/${issueId}`, {
    method: "PUT",
    body: JSON.stringify({ statusId: newStatusId, afterIssueId }),
  });
}
