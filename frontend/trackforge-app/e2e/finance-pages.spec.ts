import { test, expect } from "@playwright/test";

test("payments page creates", async ({ page }) => {
  await page.goto("/payments");
  await expect(page.getByRole("heading", { name: "Payments" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New payment" }).click();
  await page.getByPlaceholder("Description").first().fill("Add-on");
  await page.getByPlaceholder("Amount").first().fill("200");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Payment recorded")).toBeVisible({ timeout: 5000 });
});

test("refunds page creates and approves", async ({ page }) => {
  await page.goto("/refunds");
  await expect(page.getByRole("heading", { name: "Refunds" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New refund" }).click();
  await page.getByPlaceholder("Reason").first().fill("Duplicate");
  await page.getByPlaceholder("Amount").first().fill("50");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Refund requested")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Approve" }).last().click();
  await expect(page.getByText("Refund approved")).toBeVisible({ timeout: 5000 });
});

test("shipments page creates and delivers", async ({ page }) => {
  await page.goto("/shipments");
  await expect(page.getByRole("heading", { name: "Shipments" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New shipment" }).click();
  await page.getByPlaceholder("Order").first().fill("Order 999");
  await page.getByPlaceholder("Tracking").fill("TRACK123");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Shipment created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Deliver" }).last().click();
  await expect(page.getByText("Shipment delivered")).toBeVisible({ timeout: 5000 });
});

test("budgets page creates", async ({ page }) => {
  await page.goto("/budgets");
  await expect(page.getByRole("heading", { name: "Budgets" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New budget" }).click();
  await page.getByPlaceholder("Budget name").fill("Engineering");
  await page.getByPlaceholder("Total").first().fill("200000");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Budget created")).toBeVisible({ timeout: 5000 });
});

test("expenses page creates", async ({ page }) => {
  await page.goto("/expenses");
  await expect(page.getByRole("heading", { name: "Expenses" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New expense" }).click();
  await page.getByPlaceholder("Description").first().fill("Office");
  await page.getByPlaceholder("Amount").first().fill("400");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Expense added")).toBeVisible({ timeout: 5000 });
});
