import { test, expect } from "@playwright/test";

test("permissions page updates", async ({ page }) => {
  await page.goto("/permissions");
  await expect(page.getByRole("heading", { name: "Permissions" })).toBeVisible({ timeout: 15000 });
  const checkbox = page.locator('input[type="checkbox"]').first();
  const before = await checkbox.isChecked();
  await checkbox.click();
  await expect(page.getByText("Permission updated")).toBeVisible({ timeout: 5000 });
});

test("billing page switches plan", async ({ page }) => {
  await page.goto("/billing");
  await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: /Free/ }).first().click();
  await expect(page.getByText("Selected Free")).toBeVisible({ timeout: 5000 });
});

test("integrations toggle", async ({ page }) => {
  await page.goto("/integrations");
  await expect(page.getByRole("heading", { name: "Integrations" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: /Connect/ }).first().click();
  await expect(page.getByText("Slack connected")).toBeVisible({ timeout: 5000 });
});

test("service desk creates ticket", async ({ page }) => {
  await page.goto("/service-desk");
  await expect(page.getByRole("heading", { name: "Service desk" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New ticket" }).click();
  await page.getByPlaceholder("Ticket subject").fill("Test ticket");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Ticket created")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Test ticket")).toBeVisible();
});

test("portfolio loads projects", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { name: "Portfolio" })).toBeVisible({ timeout: 15000 });
  await expect(page.getByText("Engineering")).toBeVisible();
  await expect(page.getByText(/complete/).first()).toBeVisible();
});
