export interface Issue {
  id: string;
  projectId: string;
  issueTypeName: string | null;
  statusName: string | null;
  statusCategory: string | null;
  summary: string;
  description: string | null;
  reporterId: string | null;
  assigneeId: string | null;
  priority: string | null;
  storyPoints: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface IssueComment {
  id: string;
  issueId: string;
  authorId: string;
  authorName: string | null;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  issueId: string;
  uploadedBy: string;
  fileName: string;
  contentType: string | null;
  sizeBytes: number;
  scanStatus: string;
  downloadUrl: string;
  createdAt: string;
}

export interface CreateIssueInput {
  projectId: string;
  issueTypeId: string;
  summary: string;
  description?: string;
  assigneeId?: string;
  priority?: string;
  storyPoints?: number;
  parentId?: string;
}
