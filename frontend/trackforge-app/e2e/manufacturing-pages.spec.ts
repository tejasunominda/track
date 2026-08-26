import { test, expect } from "@playwright/test";

test("manufacturing page starts", async ({ page }) => {
  await page.goto("/manufacturing");
  await expect(page.getByRole("heading", { name: "Manufacturing" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New line" }).click();
  await page.getByPlaceholder("Workstation name").fill("Line C");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Workstation added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Start" }).last().click();
  await expect(page.getByText("Workstation started")).toBeVisible({ timeout: 5000 });
});

test("bill of materials creates", async ({ page }) => {
  await page.goto("/bill-of-materials");
  await expect(page.getByRole("heading", { name: "Bill of materials" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New line" }).click();
  await page.getByPlaceholder("Product").fill("Thing");
  await page.getByPlaceholder("Component").fill("Bolt");
  await page.getByPlaceholder("Qty").fill("6");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("BOM line added")).toBeVisible({ timeout: 5000 });
});

test("work orders close", async ({ page }) => {
  await page.goto("/work-orders");
  await expect(page.getByRole("heading", { name: "Work orders" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New WO" }).click();
  await page.getByPlaceholder("WO name").fill("WO 999");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Work order created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Close" }).last().click();
  await expect(page.getByText("Work order closed")).toBeVisible({ timeout: 5000 });
});

test("procurement approves", async ({ page }) => {
  await page.goto("/procurement");
  await expect(page.getByRole("heading", { name: "Procurement" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New request" }).click();
  await page.getByPlaceholder("Item").first().fill("Resistors");
  await page.getByPlaceholder("Quantity").first().fill("100");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Request created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Approve" }).last().click();
  await expect(page.getByText("Request approved")).toBeVisible({ timeout: 5000 });
});

test("software page creates", async ({ page }) => {
  await page.goto("/software");
  await expect(page.getByRole("heading", { name: "Software" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New license" }).click();
  await page.getByPlaceholder("Software name").fill("Figma");
  await page.getByPlaceholder("Seats").fill("10");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Software added")).toBeVisible({ timeout: 5000 });
});
