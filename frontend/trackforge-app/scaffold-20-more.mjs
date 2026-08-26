import fs from "fs";
import path from "path";

const features = [
  { name: "Teams", title: "Teams", text: "DevOps" },
  { name: "Goals", title: "Goals", text: "Q1 target" },
  { name: "Forms", title: "Forms", text: "Request form" },
  { name: "Assets", title: "Assets", text: "Logo" },
  { name: "Calendar", title: "Calendar", text: "March 2026" },
  { name: "Timeline", title: "Timeline", text: "Q1 phase" },
  { name: "Dependencies", title: "Dependencies", text: "Blocks ENG-12" },
  { name: "Approvals", title: "Approvals", text: "Pending" },
  { name: "Announcements", title: "Announcements", text: "Launch note" },
  { name: "Templates", title: "Templates", text: "Bug template" },
  { name: "ReportsExport", title: "Reports export", text: "PDF" },
  { name: "RuleEngine", title: "Rule engine", text: "Auto-assign" },
  { name: "Roles", title: "Roles", text: "Owner" },
  { name: "Groups", title: "Groups", text: "Engineering" },
  { name: "Invitations", title: "Invitations", text: "Pending invite" },
  { name: "Security", title: "Security", text: "2FA" },
  { name: "Webhooks", title: "Webhooks", text: "GitHub hook" },
  { name: "AuditTrail", title: "Audit trail", text: "Login event" },
  { name: "Migrate", title: "Migrate", text: "Jira CSV" },
  { name: "Analytics", title: "Analytics", text: "Issues resolved" },
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

// Update SidebarNav.tsx - add a More 2 section before </nav>
let sidebar = fs.readFileSync("src/app/SidebarNav.tsx", "utf8");
const moreNav = features
  .map((f) => `        <SidebarItem to="/${kebab(f.name)}" icon={List} label="${f.title}" />`)
  .join("\n");
sidebar = sidebar.replace(
  `    </nav>`,
  `      <SidebarSection title="More 2">\n${moreNav}\n      </SidebarSection>\n    </nav>`
);
fs.writeFileSync("src/app/SidebarNav.tsx", sidebar);

console.log("Generated 20 more features, 40 files.");
