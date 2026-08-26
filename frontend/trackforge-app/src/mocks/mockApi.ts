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

const comments = [
  { id: "c-1", issueId: "i-1", authorId: "u-2", authorName: "Alice", body: "I can take this one.", createdAt: "2025-01-05T08:30:00Z", updatedAt: "2025-01-05T08:30:00Z" },
  { id: "c-2", issueId: "i-1", authorId: "u-1", authorName: "Bob", body: "Let's pair on it tomorrow.", createdAt: "2025-01-05T09:00:00Z", updatedAt: "2025-01-05T09:00:00Z" },
];

const attachments = [
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

export async function mockFetch(path: string, init?: RequestInit): Promise<any> {
  await sleep(250); // realistic latency
  const clean = path.replace(/^\/api\/v1/, "");

  if (clean === "/auth/login" && init?.method === "POST") {
    return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" };
  }

  if (clean === "/projects") {
    return projects;
  }

  if (clean.startsWith("/issues?")) {
    const q = queryParams(clean);
    return issues.filter((i) => i.projectId === q.projectId).map((i) => ({ ...i }));
  }

  if (clean.startsWith("/issues/") && !clean.includes("/comments") && !clean.includes("/attachments")) {
    const id = clean.replace("/issues/", "");
    return issues.find((i) => i.id === id) ?? { status: 404, error: { message: "Not found" } };
  }

  if (clean.match(/\/issues\/.+\/comments/)) {
    const id = clean.split("/")[2];
    return comments.filter((c) => c.issueId === id);
  }

  if (clean.match(/\/issues\/.+\/attachments/)) {
    const id = clean.split("/")[2];
    return attachments.filter((a) => a.issueId === id);
  }

  if (clean.match(/\/projects\/.+\/board$/)) {
    const id = clean.split("/")[2];
    return { ...board, projectId: id };
  }

  if (clean.match(/\/projects\/.+\/issues/)) {
    const id = clean.split("/")[2];
    return issues.filter((i) => i.projectId === id).map((i) => ({ ...i }));
  }

  if (clean.startsWith("/reports/velocity")) {
    return velocity;
  }

  if (clean.startsWith("/reports/burndown/")) {
    return { totalStoryPoints: 20, remainingStoryPoints: 6, completedStoryPoints: 14 };
  }

  if (clean === "/search/filters") {
    return [
      { id: "f-1", name: "High priority bugs", query: 'type = "Bug" AND priority = "High"' },
      { id: "f-2", name: "My issues", query: 'assignee = "me" AND status != "Done"' },
    ];
  }

  throw new Error(`Mock not implemented for ${clean}`);
}
