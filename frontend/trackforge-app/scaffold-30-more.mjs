import fs from "fs";
import path from "path";

const features = [
  { name: "Gantt", title: "Gantt", text: "Gantt view" },
  { name: "TimeSheets", title: "Time sheets", text: "Submitted" },
  { name: "ResourcePlanning", title: "Resource planning", text: "Resource A" },
  { name: "RiskRegister", title: "Risk register", text: "High risk" },
  { name: "ChangeLog", title: "Change log", text: "v2.0 changes" },
  { name: "ReleaseNotes", title: "Release notes", text: "Version notes" },
  { name: "ProductRequirements", title: "Product requirements", text: "PRD" },
  { name: "TestPlans", title: "Test plans", text: "Test plan 1" },
  { name: "TestCases", title: "Test cases", text: "Test case A" },
  { name: "TestRuns", title: "Test runs", text: "Run #42" },
  { name: "Environments", title: "Environments", text: "Production" },
  { name: "Deployments", title: "Deployments", text: "Build 99" },
  { name: "FeatureFlags", title: "Feature flags", text: "Enabled" },
  { name: "ABTests", title: "A/B tests", text: "Variant A" },
  { name: "Metrics", title: "Metrics", text: "CPU usage" },
  { name: "Alerts", title: "Alerts", text: "P1" },
  { name: "Incidents", title: "Incidents", text: "Incident 12" },
  { name: "OnCall", title: "On-call", text: "On-call" },
  { name: "Postmortems", title: "Postmortems", text: "Root cause" },
  { name: "ServiceCatalog", title: "Service catalog", text: "Service A" },
  { name: "Runbooks", title: "Runbooks", text: "Runbook 1" },
  { name: "Macros", title: "Macros", text: "Macro 1" },
  { name: "QuickFilters", title: "Quick filters", text: "Quick filter" },
  { name: "ColorSchemes", title: "Color schemes", text: "Dark mode" },
  { name: "EmailTemplates", title: "Email templates", text: "Email 1" },
  { name: "InAppMessages", title: "In-app messages", text: "In-app" },
  { name: "Tasks", title: "Tasks", text: "Task 1" },
  { name: "Subtasks", title: "Subtasks", text: "Subtask A" },
  { name: "Checklists", title: "Checklists", text: "Checklist" },
  { name: "TaskDependencies", title: "Task dependencies", text: "Dependency B" },
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

// Update SidebarNav.tsx - add a More 4 section before </nav>
let sidebar = fs.readFileSync("src/app/SidebarNav.tsx", "utf8");
const moreNav = features
  .map((f) => `        <SidebarItem to="/${kebab(f.name)}" icon={List} label="${f.title}" />`)
  .join("\n");
sidebar = sidebar.replace(
  `    </nav>`,
  `      <SidebarSection title="More 4">\n${moreNav}\n      </SidebarSection>\n    </nav>`
);
fs.writeFileSync("src/app/SidebarNav.tsx", sidebar);

console.log("Generated 30 more features, 60 files.");
