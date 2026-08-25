export interface BoardState {
  projectId: string;
  projectName: string;
  columns: BoardColumn[];
}

export interface BoardColumn {
  statusId: string;
  statusName: string;
  statusCategory: string;
  wipLimit: number | null;
  issues: BoardIssue[];
}

export interface BoardIssue {
  id: string;
  summary: string;
  issueTypeName: string | null;
  statusName: string | null;
  statusCategory: string | null;
  priority: string | null;
  assigneeId: string | null;
  reporterId: string | null;
}
