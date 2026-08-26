import { test, expect } from "@playwright/test";

test("filters board cards", async ({ page }) => {
  await page.goto("/projects/p-1/board");
  await expect(page.getByText("Implement user authentication")).toBeVisible({ timeout: 15000 });
  await page.getByPlaceholder("Filter cards…").fill("favicon");
  await expect(page.getByText("Fix missing favicon")).toBeVisible();
  await expect(page.getByText("Implement user authentication")).not.toBeVisible();
});

test("creates a sprint", async ({ page }) => {
  await page.goto("/projects/p-1/sprints");
  await expect(page.getByText("Sprint 1")).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Create sprint" }).click();
  await page.getByPlaceholder("Sprint name").fill("Sprint X");
  await page.getByText("Save sprint").click();
  await expect(page.getByText("Sprint created")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Sprint X")).toBeVisible();
});

test("shows dashboard metrics", async ({ page }) => {
  await page.goto("/dashboards");
  await expect(page.getByText("Open issues")).toBeVisible({ timeout: 15000 });
  await expect(page.locator("text=/[0-9]+/").first()).toBeVisible();
});

test("marks notifications read", async ({ page }) => {
  await page.goto("/notifications");
  await expect(page.getByText("Alice commented on ENG-12")).toBeVisible({ timeout: 15000 });
  await page.getByText("Mark all read").click();
  await expect(page.getByText("All notifications marked as read")).toBeVisible({ timeout: 5000 });
});

test("applies a saved filter", async ({ page }) => {
  await page.goto("/filters");
  await expect(page.getByText("High priority bugs")).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Apply" }).first().click();
  await expect(page).toHaveURL(/projects\/p-1\/issues/);
});
