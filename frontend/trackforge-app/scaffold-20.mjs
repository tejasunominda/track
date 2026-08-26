import fs from "fs";
import path from "path";

const features = [
  { name: "Labels", title: "Labels", text: "Bug" },
  { name: "Components", title: "Components", text: "Authentication" },
  { name: "Releases", title: "Releases", text: "v1.0.0" },
  { name: "Workflows", title: "Workflows", text: "To Do" },
  { name: "IssueTypes", title: "Issue types", text: "Story" },
  { name: "Permissions", title: "Permissions", text: "ADMIN" },
  { name: "Billing", title: "Billing", text: "Active plan" },
  { name: "Integrations", title: "Integrations", text: "Slack" },
  { name: "ServiceDesk", title: "Service desk", text: "Tickets" },
  { name: "Portfolio", title: "Portfolio", text: "Programs" },
  { name: "Roadmap", title: "Roadmap", text: "Q1 goals" },
  { name: "Epics", title: "Epics", text: "Platform" },
  { name: "Versions", title: "Versions", text: "Backlog" },
  { name: "TimeTracking", title: "Time tracking", text: "Logged" },
  { name: "SLA", title: "SLA policies", text: "Premium" },
  { name: "CustomFields", title: "Custom fields", text: "Severity" },
  { name: "Automation", title: "Automation", text: "Rules" },
  { name: "Import", title: "Import", text: "CSV" },
  { name: "Export", title: "Export", text: "JSON" },
  { name: "Archive", title: "Archive", text: "Closed" },
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
  await expect(page.getByText("${f.text}")).toBeVisible();
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
  `        <Route path="help" element={<HelpPage />} />`,
  `        <Route path="help" element={<HelpPage />} />\n${routeBlock}`
);
fs.writeFileSync("src/routes/AppRoutes.tsx", routes);

// Update SidebarNav.tsx - add a More section before closing nav
let sidebar = fs.readFileSync("src/app/SidebarNav.tsx", "utf8");
const moreNav = features
  .map((f) => `        <SidebarItem to="/${kebab(f.name)}" icon={List} label="${f.title}" />`)
  .join("\n");
sidebar = sidebar.replace(
  `    </nav>`,
  `      <SidebarSection title="More">\n${moreNav}\n      </SidebarSection>\n    </nav>`
);
fs.writeFileSync("src/app/SidebarNav.tsx", sidebar);

console.log("Generated 20 features, 40 files.");
