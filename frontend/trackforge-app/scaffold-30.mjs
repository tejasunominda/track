import fs from "fs";
import path from "path";

const features = [
  { name: "Boards", title: "Boards", text: "Kanban view" },
  { name: "Queues", title: "Queues", text: "Open queue" },
  { name: "CannedResponses", title: "Canned responses", text: "Thanks for reporting" },
  { name: "RequestTypes", title: "Request types", text: "IT support" },
  { name: "Portal", title: "Portal", text: "Customer portal" },
  { name: "Surveys", title: "Surveys", text: "CSAT" },
  { name: "KnowledgeBase", title: "Knowledge base", text: "How-to guide" },
  { name: "ReportsBuilder", title: "Reports builder", text: "Bar chart" },
  { name: "DashboardBuilder", title: "Dashboard builder", text: "Widget A" },
  { name: "Schemes", title: "Schemes", text: "Default scheme" },
  { name: "FieldConfigs", title: "Field configs", text: "Required fields" },
  { name: "Screens", title: "Screens", text: "Create issue" },
  { name: "NotificationsHub", title: "Notifications hub", text: "Issue updated" },
  { name: "Subscriptions", title: "Subscriptions", text: "Weekly digest" },
  { name: "Mentions", title: "Mentions", text: "@alice" },
  { name: "Watchers", title: "Watchers", text: "Watching" },
  { name: "Votes", title: "Votes", text: "Upvoted" },
  { name: "Flags", title: "Flags", text: "Flagged" },
  { name: "Bookmarks", title: "Bookmarks", text: "Saved query" },
  { name: "Trash", title: "Trash", text: "Deleted issue" },
  { name: "RecycleBin", title: "Recycle bin", text: "Restore" },
  { name: "Copy", title: "Copy", text: "Duplicate" },
  { name: "Move", title: "Move", text: "Move to" },
  { name: "BulkEdit", title: "Bulk edit", text: "Change assignee" },
  { name: "Link", title: "Link", text: "Relates to" },
  { name: "Clone", title: "Clone", text: "Clone of" },
  { name: "History", title: "History", text: "Changed status" },
  { name: "Activity", title: "Activity", text: "Logged work" },
  { name: "Drafts", title: "Drafts", text: "Unpublished" },
  { name: "Reminders", title: "Reminders", text: "Due tomorrow" },
];

function kebab(s) {
  return s.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}

for (const f of features) {
  const dir = path.join("src/features", kebab(f.name), "pages");
  fs.mkdirSync(dir, { recursive: true });

  const items = [
    { id: "a", label: f.text },
    { id: "b", label: "Sample B" },
    { id: "c", label: "Sample C" },
  ];

  const page = `export function ${f.name}Page() {
  const items = ${JSON.stringify(items)};
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">${f.title}</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <span className="font-medium text-slate-900">{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dir, `${f.name}Page.tsx`), page);

  const spec = `import { test, expect } from "@playwright/test";

test("loads ${f.title.toLowerCase()} page", async ({ page }) => {
  await page.goto("/${kebab(f.name)}");
  await expect(page.getByRole("heading", { name: "${f.title}" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("${f.text}", { exact: true })).toBeVisible();
});
`;

  fs.writeFileSync(path.join("e2e", `${kebab(f.name)}.spec.ts`), spec);
}

// Update AppRoutes.tsx
let routes = fs.readFileSync("src/routes/AppRoutes.tsx", "utf8");
const importBlock = features
  .map((f) => `import { ${f.name}Page } from "@/features/${kebab(f.name)}/pages/${f.name}Page";`)
  .join("\n");
routes = routes.replace(
  `import { Routes, Route, Navigate } from "react-router-dom";`,
  `import { Routes, Route, Navigate } from "react-router-dom";\n${importBlock}`
);
const routeBlock = features.map((f) => `        <Route path="${kebab(f.name)}" element={<${f.name}Page />} />`).join("\n");
routes = routes.replace(
  `        <Route path="issues/:issueId" element={<IssueDetailPage />} />`,
  `        <Route path="issues/:issueId" element={<IssueDetailPage />} />\n${routeBlock}`
);
fs.writeFileSync("src/routes/AppRoutes.tsx", routes);

// Update SidebarNav.tsx - add a More 3 section before </nav>
let sidebar = fs.readFileSync("src/app/SidebarNav.tsx", "utf8");
const moreNav = features
  .map((f) => `        <SidebarItem to="/${kebab(f.name)}" icon={List} label="${f.title}" />`)
  .join("\n");
sidebar = sidebar.replace(
  `    </nav>`,
  `      <SidebarSection title="More 3">\n${moreNav}\n      </SidebarSection>\n    </nav>`
);
fs.writeFileSync("src/app/SidebarNav.tsx", sidebar);

console.log("Generated 30 features, 60 files.");
