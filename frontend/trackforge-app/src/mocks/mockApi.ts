import { ProjectSummary } from "@/features/projects/api/projects";
import { Issue } from "@/features/issues/types/issue";

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

let workLogs: any[] = [
  { id: "w-1", issueId: "i-1", authorId: "u-2", authorName: "Alice", timeSpentMinutes: 120, description: "Initial setup", startedAt: "2025-01-05T09:00:00Z", createdAt: "2025-01-05T09:00:00Z" },
];

const watchers = new Set<string>(["i-1:u-2"]);
const stars = new Set<string>(["i-1:u-me"]);
const issueLinks: any[] = [];
const issueLabels: Record<string, string[]> = { "i-1": ["auth", "frontend"] };

const velocity = [
  { sprintId: "sp-1", sprintName: "Sprint 1", committed: 18, completed: 14 },
  { sprintId: "sp-2", sprintName: "Sprint 2", committed: 20, completed: 19 },
  { sprintId: "sp-3", sprintName: "Sprint 3", committed: 22, completed: 16 },
  { sprintId: "sp-4", sprintName: "Sprint 4", committed: 16, completed: 12 },
];

let sprints: any[] = [
  { id: "sp-1", projectId: "p-1", name: "Sprint 1", goal: "Authentication flow", status: "ACTIVE", startDate: "2025-01-01", endDate: "2025-01-14" },
  { id: "sp-2", projectId: "p-1", name: "Sprint 2", goal: "Board polish", status: "PLANNED", startDate: null, endDate: null },
  { id: "sp-3", projectId: "p-1", name: "Sprint 3", goal: "Reporting basics", status: "CLOSED", startDate: "2024-12-01", endDate: "2024-12-14" },
];

let notifications: any[] = [
  { id: "n-1", text: "Alice commented on ENG-12", time: "2 min ago", read: false },
  { id: "n-2", text: "Sprint 2 started", time: "1 hour ago", read: false },
  { id: "n-3", text: "You were assigned to ENG-8", time: "3 hours ago", read: true },
];

const users: any[] = [
  { id: "u-1", name: "Bob", email: "bob@example.com", role: "Admin" },
  { id: "u-2", name: "Alice", email: "alice@example.com", role: "Developer" },
  { id: "u-3", name: "Charlie", email: "charlie@example.com", role: "Viewer" },
];

const auditLogs: any[] = [
  { id: "al-1", userId: "u-1", userName: "Bob", action: "UPDATE", target: "i-1", targetType: "issue", description: "Changed status to In Progress", occurredAt: "2025-01-05T10:00:00Z" },
  { id: "al-2", userId: "u-2", userName: "Alice", action: "CREATE", target: "i-4", targetType: "issue", description: "Created issue", occurredAt: "2025-01-05T11:00:00Z" },
  { id: "al-3", userId: "u-3", userName: "Charlie", action: "DELETE", target: "i-5", targetType: "issue", description: "Deleted issue", occurredAt: "2025-01-05T12:00:00Z" },
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

function getBoard(projectId: string) {
  const project = projects.find((p) => p.id === projectId);
  const projectIssues = issues.filter((i) => i.projectId === projectId);
  const mapIssue = (i: Issue) => ({
    id: i.id,
    summary: i.summary,
    issueTypeName: i.issueTypeName,
    statusName: i.statusName,
    statusCategory: i.statusCategory,
    priority: i.priority,
    assigneeId: i.assigneeId,
    reporterId: i.reporterId,
  });
  return {
    projectId,
    projectName: project?.name ?? "Unknown",
    columns: [
      { statusId: "s-todo", statusName: "To Do", statusCategory: "TODO", wipLimit: null, issues: projectIssues.filter((i) => i.statusName === "To Do").map(mapIssue) },
      { statusId: "s-inprogress", statusName: "In Progress", statusCategory: "IN_PROGRESS", wipLimit: 4, issues: projectIssues.filter((i) => i.statusName === "In Progress").map(mapIssue) },
      { statusId: "s-done", statusName: "Done", statusCategory: "DONE", wipLimit: null, issues: projectIssues.filter((i) => i.statusName === "Done").map(mapIssue) },
    ],
  };
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

  if (clean === "/issues" && method === "POST") {
    const body = init?.body ? JSON.parse(init.body as string) : {};
    const issueType = body.issueTypeId ? body.issueTypeId[0].toUpperCase() + body.issueTypeId.slice(1) : "Story";
    const newIssue: Issue = {
      id: id(),
      projectId: body.projectId ?? "p-1",
      issueTypeName: issueType,
      statusName: "To Do",
      statusCategory: "TODO",
      summary: body.summary ?? "",
      description: body.description ?? null,
      reporterId: "u-me",
      assigneeId: body.assigneeId ?? null,
      priority: body.priority ?? "Medium",
      storyPoints: body.storyPoints ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    issues.push(newIssue);
    return { ...newIssue };
  }

  const issueMatch = clean.match(/^\/issues\/([^\/]+)$/);
  if (issueMatch) {
    const issueId = issueMatch[1];
    const idx = issues.findIndex((i) => i.id === issueId);
    const issue = issues[idx];
    if (!issue) return { status: 404, error: { message: "Not found" } };
    if (method === "DELETE") {
      issues.splice(idx, 1);
      return { status: 204 };
    }
    if (method === "PUT") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      if (body.statusId) {
        const target = getBoard(issue.projectId).columns.find((c) => c.statusId === body.statusId);
        if (target) {
          issue.statusName = target.statusName;
          issue.statusCategory = target.statusCategory;
        }
      }
      if (body.statusName) issue.statusName = body.statusName;
      if (body.statusCategory) issue.statusCategory = body.statusCategory;
      if ("assigneeId" in body) issue.assigneeId = body.assigneeId || null;
      if (body.priority) issue.priority = body.priority;
      if (body.summary) issue.summary = body.summary;
      if (body.description) issue.description = body.description;
      issue.updatedAt = new Date().toISOString();
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

  const worklogMatch = clean.match(/^\/issues\/([^\/]+)\/worklogs$/);
  if (worklogMatch) {
    const issueId = worklogMatch[1];
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const newWorkLog = { id: id(), issueId, authorId: "u-me", authorName: "Me", timeSpentMinutes: body.timeSpentMinutes ?? 0, description: body.description ?? null, startedAt: new Date().toISOString(), createdAt: new Date().toISOString() };
      workLogs.push(newWorkLog);
      return newWorkLog;
    }
    return workLogs.filter((w) => w.issueId === issueId);
  }

  const watcherMatch = clean.match(/^\/issues\/([^\/]+)\/watchers$/);
  if (watcherMatch) {
    const issueId = watcherMatch[1];
    const key = (uid: string) => `${issueId}:${uid}`;
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      watchers.add(key(body.userId ?? "u-me"));
      return { status: 204 };
    }
    if (method === "DELETE") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      watchers.delete(key(body.userId ?? "u-me"));
      return { status: 204 };
    }
    return { count: [...watchers].filter((k) => k.startsWith(`${issueId}:`)).length, isWatching: watchers.has(key("u-me")) };
  }

  const starMatch = clean.match(/^\/issues\/([^\/]+)\/star$/);
  if (starMatch) {
    const issueId = starMatch[1];
    const key = `${issueId}:u-me`;
    if (method === "POST") {
      stars.add(key);
      return { starred: true };
    }
    if (method === "DELETE") {
      stars.delete(key);
      return { starred: false };
    }
    return { starred: stars.has(key) };
  }

  const subtaskMatch = clean.match(/^\/issues\/([^\/]+)\/subtasks$/);
  if (subtaskMatch) {
    const issueId = subtaskMatch[1];
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const parent = issues.find((i) => i.id === issueId);
      const newIssue = { id: id(), projectId: parent?.projectId ?? "p-1", issueTypeName: "Sub-task", statusName: "To Do", statusCategory: "TODO", summary: body.summary, description: body.description ?? null, reporterId: "u-me", assigneeId: body.assigneeId ?? null, priority: "Medium", storyPoints: null, parentId: issueId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      issues.push(newIssue);
      return newIssue;
    }
    return issues.filter((i) => i.parentId === issueId);
  }

  const linkMatch = clean.match(/^\/issues\/([^\/]+)\/links$/);
  if (linkMatch) {
    const issueId = linkMatch[1];
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const target = issues.find((i) => i.id === body.targetId);
      const newLink = { id: id(), fromIssueId: issueId, toIssueId: body.targetId, toSummary: target?.summary ?? body.targetId, linkType: body.linkType ?? "relates to" };
      issueLinks.push(newLink);
      return newLink;
    }
    return issueLinks.filter((l) => l.fromIssueId === issueId);
  }

  const labelMatch = clean.match(/^\/issues\/([^\/]+)\/labels$/);
  if (labelMatch) {
    const issueId = labelMatch[1];
    const labels = issueLabels[issueId] ?? [];
    if (method === "POST") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      const label = body.label;
      if (label && !labels.includes(label)) {
        issueLabels[issueId] = [...labels, label];
      }
      return issueLabels[issueId];
    }
    if (method === "DELETE") {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      issueLabels[issueId] = labels.filter((l) => l !== body.label);
      return issueLabels[issueId];
    }
    return labels;
  }

  const sprintMatch = clean.match(/^\/sprints\/([^\/]+)\/(start|complete)$/);
  if (sprintMatch) {
    const sprintId = sprintMatch[1];
    const action = sprintMatch[2];
    const sprint = sprints.find((s) => s.id === sprintId);
    if (sprint) {
      sprint.status = action === "start" ? "ACTIVE" : "CLOSED";
    }
    return sprint;
  }

  if (clean === "/sprints" && method === "POST") {
    const body = init?.body ? JSON.parse(init.body as string) : {};
    const newSprint = { id: id(), projectId: body.projectId ?? "p-1", name: body.name, goal: body.goal ?? null, status: "PLANNED", startDate: null, endDate: null };
    sprints.push(newSprint);
    return newSprint;
  }

  if (clean.startsWith("/sprints?")) {
    const q = queryParams(clean);
    return sprints.filter((s) => s.projectId === q.projectId);
  }

  const notificationReadMatch = clean.match(/^\/notifications\/([^\/]+)\/read$/);
  if (notificationReadMatch) {
    const note = notifications.find((n) => n.id === notificationReadMatch[1]);
    if (note) note.read = true;
    return note;
  }

  if (clean === "/notifications/read-all" && method === "POST") {
    notifications.forEach((n) => (n.read = true));
    return notifications;
  }

  if (clean === "/notifications") {
    return notifications;
  }

  if (clean === "/users") {
    return users;
  }

  if (clean === "/audit-logs") {
    return auditLogs;
  }

  if (clean.startsWith("/reports/issue-types")) {
    const q = queryParams(clean);
    const pid = q.projectId ?? "p-1";
    const projectIssues = issues.filter((i) => i.projectId === pid);
    const counts: Record<string, number> = {};
    projectIssues.forEach((i) => { const k = i.issueTypeName ?? "Unknown"; counts[k] = (counts[k] ?? 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }

  if (clean.startsWith("/reports/priority")) {
    const q = queryParams(clean);
    const pid = q.projectId ?? "p-1";
    const projectIssues = issues.filter((i) => i.projectId === pid);
    const counts: Record<string, number> = {};
    projectIssues.forEach((i) => { const k = i.priority ?? "None"; counts[k] = (counts[k] ?? 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }

  if (clean.match(/\/projects\/.+\/board$/)) {
    const pid = clean.split("/")[2];
    return getBoard(pid);
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

  if (clean.startsWith("/search?")) {
    const q = queryParams(clean).q?.toLowerCase() ?? "";
    return {
      issues: issues
        .filter((i) => i.summary.toLowerCase().includes(q) || (i.description ?? "").toLowerCase().includes(q))
        .map((i) => ({ id: i.id, summary: i.summary, projectId: i.projectId, issueTypeName: i.issueTypeName, statusName: i.statusName, priority: i.priority, assigneeId: i.assigneeId })),
      projects: projects
        .filter((p) => p.name.toLowerCase().includes(q) || p.projectKey.toLowerCase().includes(q))
        .map((p) => ({ id: p.id, name: p.name, projectKey: p.projectKey })),
    };
  }

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
