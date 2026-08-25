import { apiFetch } from "@/api/client";
import { Attachment, CreateIssueInput, Issue, IssueComment } from "@/features/issues/types/issue";

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
