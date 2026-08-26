import { ProjectSummary } from "@/features/projects/api/projects";
import { Issue } from "@/features/issues/types/issue";
import { BoardState } from "@/features/board/types/board";

const projects: ProjectSummary[] = [
  {
    id: "p-1",
    name: "Engineering",
    projectKey: "ENG",
    description: "Core engineering team sprint work.",
    template: "SCRUM",
    status: "ACTIVE",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-2",
    name: "Marketing",
    projectKey: "MKT",
    description: "Campaigns and content planning.",
    template: "KANBAN",
    status: "ACTIVE",
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
  },
  {
    id: "p-3",
    name: "Operations",
    projectKey: "OPS",
    description: "Internal tools and automation.",
    template: "BUSINESS",
    status: "ACTIVE",
    createdAt: "2025-01-03T00:00:00Z",
    updatedAt: "2025-01-03T00:00:00Z",
  },
];

const issues: Issue[] = [
  {
    id: "i-1",
    projectId: "p-1",
    issueTypeName: "Story",
    statusName: "To Do",
    statusCategory: "TODO",
    summary: "Implement user authentication",
    description: "Add login and signup flows with JWT tokens.",
    reporterId: "u-1",
    assigneeId: "u-2",
    priority: "High",
    storyPoints: 8,
    createdAt: "2025-01-04T08:00:00Z",
    updatedAt: "2025-01-05T08:00:00Z",
  },
  {
    id: "i-2",
    projectId: "p-1",
    issueTypeName: "Bug",
    statusName: "In Progress",
    statusCategory: "IN_PROGRESS",
    summary: "Fix rank calculation edge case",
    description: "LexoRank returns null when list is empty.",
    reporterId: "u-1",
    assigneeId: "u-3",
    priority: "Highest",
    storyPoints: 3,
    createdAt: "2025-01-04T09:00:00Z",
    updatedAt: "2025-01-05T09:00:00Z",
  },
  {
    id: "i-3",
    projectId: "p-1",
    issueTypeName: "Task",
    statusName: "Done",
    statusCategory: "DONE",
    summary: "Set up Docker Compose",
    description: "Add Postgres, Redis and backend services.",
    reporterId: "u-2",
    assigneeId: "u-1",
    priority: "Medium",
    storyPoints: 5,
    createdAt: "2025-01-03T10:00:00Z",
    updatedAt: "2025-01-04T10:00:00Z",
  },
  {
    id: "i-4",
    projectId: "p-1",
    issueTypeName: "Story",
    statusName: "To Do",
    statusCategory: "TODO",
    summary: "Build board drag-and-drop",
    description: "Use dnd-kit for kanban columns.",
    reporterId: "u-3",
    assigneeId: "u-2",
    priority: "High",
    storyPoints: 8,
    createdAt: "2025-01-05T11:00:00Z",
    updatedAt: "2025-01-05T11:00:00Z",
  },
  {
    id: "i-5",
    projectId: "p-1",
    issueTypeName: "Story",
    statusName: "In Progress",
    statusCategory: "IN_PROGRESS",
    summary: "Design email templates",
    description: "Create notification email templates.",
    reporterId: "u-1",
    assigneeId: "u-3",
    priority: "Low",
    storyPoints: 3,
    createdAt: "2025-01-05T12:00:00Z",
    updatedAt: "2025-01-05T12:00:00Z",
  },
  {
    id: "i-6",
    projectId: "p-1",
    issueTypeName: "Bug",
    statusName: "To Do",
    statusCategory: "TODO",
    summary: "Fix missing favicon",
    description: "Add proper favicon.ico asset.",
    reporterId: "u-2",
    assigneeId: null,
    priority: "Lowest",
    storyPoints: 1,
    createdAt: "2025-01-06T08:00:00Z",
    updatedAt: "2025-01-06T08:00:00Z",
  },
];

let comments = [
  { id: "c-1", issueId: "i-1", authorId: "u-2", authorName: "Alice", body: "I can take this one.", createdAt: "2025-01-05T08:30:00Z", updatedAt: "2025-01-05T08:30:00Z" },
  { id: "c-2", issueId: "i-1", authorId: "u-1", authorName: "Bob", body: "Let's pair on it tomorrow.", createdAt: "2025-01-05T09:00:00Z", updatedAt: "2025-01-05T09:00:00Z" },
];

let attachments = [
  { id: "a-1", issueId: "i-1", uploadedBy: "u-2", fileName: "auth-flow.png", contentType: "image/png", sizeBytes: 124000, scanStatus: "CLEAN", downloadUrl: "#", createdAt: "2025-01-05T10:00:00Z" },
];

const board: BoardState = {
  projectId: "p-1",
  projectName: "Engineering",
  columns: [
    {
      statusId: "s-todo",
      statusName: "To Do",
      statusCategory: "TODO",
      wipLimit: null,
      issues: issues.filter((i) => i.statusName === "To Do").map((i) => ({ id: i.id, summary: i.summary, issueTypeName: i.issueTypeName, statusName: i.statusName, statusCategory: i.statusCategory, priority: i.priority, assigneeId: i.assigneeId, reporterId: i.reporterId })),
    },
    {
      statusId: "s-inprogress",
      statusName: "In Progress",
      statusCategory: "IN_PROGRESS",
      wipLimit: 4,
      issues: issues.filter((i) => i.statusName === "In Progress").map((i) => ({ id: i.id, summary: i.summary, issueTypeName: i.issueTypeName, statusName: i.statusName, statusCategory: i.statusCategory, priority: i.priority, assigneeId: i.assigneeId, reporterId: i.reporterId })),
    },
    {
      statusId: "s-done",
      statusName: "Done",
      statusCategory: "DONE",
      wipLimit: null,
      issues: issues.filter((i) => i.statusName === "Done").map((i) => ({ id: i.id, summary: i.summary, issueTypeName: i.issueTypeName, statusName: i.statusName, statusCategory: i.statusCategory, priority: i.priority, assigneeId: i.assigneeId, reporterId: i.reporterId })),
    },
  ],
};

const velocity = [
  { sprintId: "sp-1", sprintName: "Sprint 1", committed: 18, completed: 14 },
  { sprintId: "sp-2", sprintName: "Sprint 2", committed: 20, completed: 19 },
  { sprintId: "sp-3", sprintName: "Sprint 3", committed: 22, completed: 16 },
  { sprintId: "sp-4", sprintName: "Sprint 4", committed: 16, completed: 12 },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function queryParams(path: string) {
  return Object.fromEntries(new URLSearchParams(path.includes("?") ? path.split("?")[1] : ""));
}

function id() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function mockFetch(path: string, init?: RequestInit): Promise<any> {
  await sleep(250);
  const clean = path.replace(/^\/api\/v1/, "");
  const method = (init?.method ?? "GET").toUpperCase();

  if (clean === "/auth/login" && method === "POST") {
    return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" };
  }

  if (clean === "/projects") {
    return projects;
  }

  if (clean.startsWith("/issues?")) {
    const q = queryParams(clean);
    return issues.filter((i) => i.projectId === q.projectId).map((i) => ({ ...i }));
  }

  const issueMatch = clean.match(/^\/issues\/([^\/]+)$/);
  if (issueMatch) {
    const issueId = issueMatch[1];
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return { status: 404, error: { message: "Not found" } };
    if (method === "PUT") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      if (body.statusId) {
        const target = board.columns.find((c) => c.statusId === body.statusId);
        if (target) {
          issue.statusName = target.statusName;
          issue.statusCategory = target.statusCategory;
        }
      }
      if (body.assigneeId) issue.assigneeId = body.assigneeId;
      if (body.priority) issue.priority = body.priority;
      if (body.summary) issue.summary = body.summary;
      if (body.description) issue.description = body.description;
      return { ...issue };
    }
    return { ...issue };
  }

  const commentMatch = clean.match(/^\/issues\/([^\/]+)\/comments$/);
  if (commentMatch) {
    const issueId = commentMatch[1];
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const newComment = { id: id(), issueId, authorId: "u-me", authorName: "Me", body: body.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      comments.push(newComment);
      return newComment;
    }
    return comments.filter((c) => c.issueId === issueId);
  }

  const attachmentMatch = clean.match(/^\/issues\/([^\/]+)\/attachments$/);
  if (attachmentMatch) {
    const issueId = attachmentMatch[1];
    if (method === "POST") {
      const newAttachment = { id: id(), issueId, uploadedBy: "u-me", fileName: "uploaded-file.txt", contentType: "text/plain", sizeBytes: 1024, scanStatus: "CLEAN", downloadUrl: "#", createdAt: new Date().toISOString() };
      attachments.push(newAttachment);
      return newAttachment;
    }
    return attachments.filter((a) => a.issueId === issueId);
  }

  if (clean.match(/\/projects\/.+\/board$/)) {
    const pid = clean.split("/")[2];
    return { ...board, projectId: pid };
  }

  if (clean.match(/\/projects\/.+\/issues/)) {
    const pid = clean.split("/")[2];
    return issues.filter((i) => i.projectId === pid).map((i) => ({ ...i }));
  }

  if (clean.startsWith("/reports/velocity")) {
    return velocity;
  }

  if (clean.startsWith("/reports/burndown/")) {
    return { totalStoryPoints: 20, remainingStoryPoints: 6, completedStoryPoints: 14 };
  }

  let filters = [
    { id: "f-1", name: "High priority bugs", query: 'type = "Bug" AND priority = "High"' },
    { id: "f-2", name: "My issues", query: 'assignee = "me" AND status != "Done"' },
  ];

  if (clean === "/search/filters") {
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const newFilter = { id: id(), name: body.name, query: body.query };
      filters.push(newFilter);
      return newFilter;
    }
    return filters;
  }

  const filterMatch = clean.match(/^\/search\/filters\/(.+)$/);
  if (filterMatch) {
    const filterId = filterMatch[1];
    if (method === "PUT") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const f = filters.find((x) => x.id === filterId);
      if (f) { f.name = body.name; f.query = body.query; }
      return f ?? { status: 404, error: { message: "Filter not found" } };
    }
    if (method === "DELETE") {
      filters = filters.filter((x) => x.id !== filterId);
      return { status: 204 };
    }
  }

  throw new Error(`Mock not implemented for ${clean} ${method}`);
}
