import { test, expect } from "@playwright/test";

test("shows reports with charts", async ({ page }) => {
  await page.goto("/projects/p-1/reports");
  await expect(page.getByText("Sprint velocity")).toBeVisible({ timeout: 15000 });
  await expect(page.getByText("Issues by type")).toBeVisible();
  await expect(page.getByText("Issues by priority")).toBeVisible();
});

test("shows people list", async ({ page }) => {
  await page.goto("/people");
  await expect(page.getByText("Bob", { exact: true })).toBeVisible({ timeout: 15000 });
  await expect(page.getByText("alice@example.com")).toBeVisible();
});

test("shows audit log", async ({ page }) => {
  await page.goto("/admin/audit-log");
  await expect(page.getByText("Changed status to In Progress")).toBeVisible({ timeout: 15000 });
});

test("shows settings and saves", async ({ page }) => {
  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible({ timeout: 15000 });
  await page.locator('input[type="text"]').first().fill("Acme Inc");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Settings saved")).toBeVisible({ timeout: 5000 });
});

test("shows project issue counts", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByText("Engineering", { exact: true })).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/\d+ issues/).first()).toBeVisible();
});
