import { test, expect } from "@playwright/test";

test("approvals page approves", async ({ page }) => {
  await page.goto("/approvals");
  await expect(page.getByRole("heading", { name: "Approvals" })).toBeVisible({ timeout: 15000 });
  await page.locator("button").filter({ has: page.locator(".lucide-check") }).first().click();
  await expect(page.getByText("Approved").first()).toBeVisible({ timeout: 5000 });
});

test("product requirements page creates", async ({ page }) => {
  await page.goto("/product-requirements");
  await expect(page.getByRole("heading", { name: "Product requirements" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New PRD" }).click();
  await page.getByPlaceholder("PRD title").fill("Reports PRD");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("PRD created")).toBeVisible({ timeout: 5000 });
});

test("customers page creates", async ({ page }) => {
  await page.goto("/customers");
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New customer" }).click();
  await page.getByPlaceholder("Customer name").fill("Stark Ind");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Customer created")).toBeVisible({ timeout: 5000 });
});

test("contacts page creates", async ({ page }) => {
  await page.goto("/contacts");
  await expect(page.getByRole("heading", { name: "Contacts" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New contact" }).click();
  await page.getByPlaceholder("Name").first().fill("Bruce");
  await page.getByPlaceholder("Email").fill("bruce@example.com");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Contact created")).toBeVisible({ timeout: 5000 });
});

test("releases page creates", async ({ page }) => {
  await page.goto("/releases");
  await expect(page.getByRole("heading", { name: "Releases" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New release" }).click();
  await page.getByPlaceholder("Release name").fill("v2.0.0");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Release created")).toBeVisible({ timeout: 5000 });
});
