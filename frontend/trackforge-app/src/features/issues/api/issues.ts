import { apiFetch } from "@/api/client";
import { Attachment, CreateIssueInput, Issue, IssueComment, WorkLog } from "@/features/issues/types/issue";

export async function listIssues(projectId: string): Promise<Issue[]> {
  return apiFetch<Issue[]>(`/issues?projectId=${projectId}`);
}

export async function fetchIssue(issueId: string): Promise<Issue> {
  return apiFetch<Issue>(`/issues/${issueId}`);
}

export async function createIssue(input: CreateIssueInput): Promise<Issue> {
  return apiFetch<Issue>("/issues", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function listComments(issueId: string): Promise<IssueComment[]> {
  return apiFetch<IssueComment[]>(`/issues/${issueId}/comments`);
}

export async function postComment(issueId: string, body: string): Promise<IssueComment> {
  return apiFetch<IssueComment>(`/issues/${issueId}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

export async function listAttachments(issueId: string): Promise<Attachment[]> {
  return apiFetch<Attachment[]>(`/issues/${issueId}/attachments`);
}

export async function uploadAttachment(issueId: string, file: File): Promise<Attachment> {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch<Attachment>(`/issues/${issueId}/attachments`, {
    method: "POST",
    body: formData,
  });
}

export async function listWorkLogs(issueId: string): Promise<WorkLog[]> {
  return apiFetch<WorkLog[]>(`/issues/${issueId}/worklogs`);
}

export async function createWorkLog(issueId: string, timeSpentMinutes: number, description?: string): Promise<WorkLog> {
  return apiFetch<WorkLog>(`/issues/${issueId}/worklogs`, {
    method: "POST",
    body: JSON.stringify({ timeSpentMinutes, description }),
  });
}

export async function deleteIssue(issueId: string): Promise<void> {
  return apiFetch<void>(`/issues/${issueId}`, { method: "DELETE" });
}

export async function updateIssue(issueId: string, patch: Partial<Issue>): Promise<Issue> {
  return apiFetch<Issue>(`/issues/${issueId}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}

export async function listWatchers(issueId: string): Promise<{ count: number; isWatching: boolean }> {
  return apiFetch(`/issues/${issueId}/watchers`);
}

export async function watchIssue(issueId: string, userId = "u-me"): Promise<void> {
  return apiFetch<void>(`/issues/${issueId}/watchers`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function unwatchIssue(issueId: string, userId = "u-me"): Promise<void> {
  return apiFetch<void>(`/issues/${issueId}/watchers`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });
}

export async function getStar(issueId: string): Promise<{ starred: boolean }> {
  return apiFetch(`/issues/${issueId}/star`);
}

export async function starIssue(issueId: string): Promise<{ starred: boolean }> {
  return apiFetch(`/issues/${issueId}/star`, { method: "POST" });
}

export async function unstarIssue(issueId: string): Promise<{ starred: boolean }> {
  return apiFetch(`/issues/${issueId}/star`, { method: "DELETE" });
}

export async function listSubTasks(issueId: string): Promise<Issue[]> {
  return apiFetch<Issue[]>(`/issues/${issueId}/subtasks`);
}

export async function createSubTask(issueId: string, summary: string, description?: string): Promise<Issue> {
  return apiFetch<Issue>(`/issues/${issueId}/subtasks`, {
    method: "POST",
    body: JSON.stringify({ summary, description }),
  });
}

export async function listLinkedIssues(issueId: string): Promise<any[]> {
  return apiFetch<any[]>(`/issues/${issueId}/links`);
}

export async function linkIssue(issueId: string, targetId: string, linkType = "relates to"): Promise<any> {
  return apiFetch(`/issues/${issueId}/links`, {
    method: "POST",
    body: JSON.stringify({ targetId, linkType }),
  });
}
