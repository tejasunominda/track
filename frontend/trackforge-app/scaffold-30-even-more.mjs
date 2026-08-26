import fs from "fs";
import path from "path";

const features = [
  { name: "Wiki", title: "Wiki", text: "Home page" },
  { name: "Documents", title: "Documents", text: "Doc A" },
  { name: "Files", title: "Files", text: "File 1" },
  { name: "Images", title: "Images", text: "Image 1" },
  { name: "Drawings", title: "Drawings", text: "Diagram" },
  { name: "MindMap", title: "Mind map", text: "Map 1" },
  { name: "Whiteboard", title: "Whiteboard", text: "Board 1" },
  { name: "Spreadsheets", title: "Spreadsheets", text: "Sheet 1" },
  { name: "Presentations", title: "Presentations", text: "Slide 1" },
  { name: "MeetingNotes", title: "Meeting notes", text: "Retro notes" },
  { name: "Retrospectives", title: "Retrospectives", text: "Sprint retro" },
  { name: "Standups", title: "Standups", text: "Daily standup" },
  { name: "OneOnOne", title: "1:1s", text: "1:1" },
  { name: "PerformanceReview", title: "Performance review", text: "Review Q1" },
  { name: "CareerPath", title: "Career path", text: "Senior" },
  { name: "SkillsMatrix", title: "Skills matrix", text: "React" },
  { name: "OrgChart", title: "Org chart", text: "CEO" },
  { name: "JobDescriptions", title: "Job descriptions", text: "Engineer" },
  { name: "Hiring", title: "Hiring", text: "Candidate" },
  { name: "Onboarding", title: "Onboarding", text: "New hire" },
  { name: "Offboarding", title: "Offboarding", text: "Exit" },
  { name: "Vacation", title: "Vacation", text: "PTO" },
  { name: "Expenses", title: "Expenses", text: "Receipt" },
  { name: "Invoices", title: "Invoices", text: "Invoice 1" },
  { name: "Contracts", title: "Contracts", text: "Contract A" },
  { name: "Vendors", title: "Vendors", text: "Vendor X" },
  { name: "Procurement", title: "Procurement", text: "Purchase" },
  { name: "Inventory", title: "Inventory", text: "Laptop" },
  { name: "Hardware", title: "Hardware", text: "MacBook" },
  { name: "Software", title: "Software", text: "License" },
];

function kebab(s) {
  return s.replace(/([A-Z0-9]+)/g, "-$1").toLowerCase().replace(/^-/, "");
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

// Update SidebarNav.tsx - add a More 5 section before </nav>
let sidebar = fs.readFileSync("src/app/SidebarNav.tsx", "utf8");
const moreNav = features
  .map((f) => `        <SidebarItem to="/${kebab(f.name)}" icon={List} label="${f.title}" />`)
  .join("\n");
sidebar = sidebar.replace(
  `    </nav>`,
  `      <SidebarSection title="More 5">\n${moreNav}\n      </SidebarSection>\n    </nav>`
);
fs.writeFileSync("src/app/SidebarNav.tsx", sidebar);

console.log("Generated 30 more features, 60 files.");
