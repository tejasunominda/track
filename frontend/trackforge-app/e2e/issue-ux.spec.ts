import { test, expect } from "@playwright/test";

test("edits summary, adds a label, and copies issue key", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByRole("heading", { name: "Implement user authentication" })).toBeVisible({ timeout: 15000 });

  await page.getByTitle("Edit summary").click({ force: true });
  await page.locator('input[value="Implement user authentication"]').fill("Edited summary");
  await page.locator('input[value="Edited summary"]').press("Enter");
  await expect(page.getByText("Summary updated")).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole("heading", { name: "Edited summary" })).toBeVisible();

  await page.getByPlaceholder("+ label").fill("ux");
  await page.getByPlaceholder("+ label").press("Enter");
  await expect(page.getByText("Label added")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("ux", { exact: true })).toBeVisible();

  await page.getByTitle("Copy issue key").click({ force: true });
  await expect(page.getByText("Issue key copied")).toBeVisible({ timeout: 5000 });
});

test("opens create issue from keyboard shortcut", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  await expect(page.getByText("Implement user authentication")).toBeVisible({ timeout: 15000 });
  await page.keyboard.press("c");
  await expect(page.getByRole("heading", { name: "Create issue" })).toBeVisible({ timeout: 5000 });
});
