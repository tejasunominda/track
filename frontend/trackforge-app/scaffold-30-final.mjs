import fs from "fs";
import path from "path";

const features = [
  { name: "Customers", title: "Customers", text: "Acme Corp" },
  { name: "Contacts", title: "Contacts", text: "John Doe" },
  { name: "Leads", title: "Leads", text: "Qualified" },
  { name: "Deals", title: "Deals", text: "Enterprise" },
  { name: "Opportunities", title: "Opportunities", text: "Expansion" },
  { name: "Quotes", title: "Quotes", text: "Quote 123" },
  { name: "Orders", title: "Orders", text: "Order 456" },
  { name: "Shipments", title: "Shipments", text: "Shipped" },
  { name: "InvoicesReceived", title: "Invoices received", text: "Vendor invoice" },
  { name: "Payments", title: "Payments", text: "Payment 789" },
  { name: "Refunds", title: "Refunds", text: "Refund 101" },
  { name: "Budgets", title: "Budgets", text: "Q1 budget" },
  { name: "Forecasts", title: "Forecasts", text: "Revenue" },
  { name: "CostCenters", title: "Cost centers", text: "Engineering" },
  { name: "PurchaseOrders", title: "Purchase orders", text: "PO 1001" },
  { name: "Suppliers", title: "Suppliers", text: "Supplier X" },
  { name: "Manufacturing", title: "Manufacturing", text: "Assembly" },
  { name: "BillOfMaterials", title: "Bill of materials", text: "BOM v1" },
  { name: "WorkOrders", title: "Work orders", text: "WO 555" },
  { name: "Quality", title: "Quality", text: "ISO 9001" },
  { name: "Inspections", title: "Inspections", text: "Pass" },
  { name: "Defects", title: "Defects", text: "Minor" },
  { name: "NonConformances", title: "Non-conformances", text: "NC-22" },
  { name: "CAPA", title: "CAPA", text: "Corrective" },
  { name: "Training", title: "Training", text: "Course 1" },
  { name: "Certifications", title: "Certifications", text: "AWS" },
  { name: "Compliance", title: "Compliance", text: "GDPR" },
  { name: "Policies", title: "Policies", text: "Policy A" },
  { name: "Procedures", title: "Procedures", text: "Procedure 1" },
  { name: "WorkInstructions", title: "Work instructions", text: "Step 1" },
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

// Update SidebarNav.tsx - add a More 6 section before </nav>
let sidebar = fs.readFileSync("src/app/SidebarNav.tsx", "utf8");
const moreNav = features
  .map((f) => `        <SidebarItem to="/${kebab(f.name)}" icon={List} label="${f.title}" />`)
  .join("\n");
sidebar = sidebar.replace(
  `    </nav>`,
  `      <SidebarSection title="More 6">\n${moreNav}\n      </SidebarSection>\n    </nav>`
);
fs.writeFileSync("src/app/SidebarNav.tsx", sidebar);

console.log("Generated 30 more features, 60 files.");
