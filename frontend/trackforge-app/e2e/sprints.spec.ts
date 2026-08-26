import { test, expect } from "@playwright/test";

test("loads sprints page", async ({ page }) => {
  await page.goto("/projects/p-1/sprints");
  await expect(page.getByRole("heading", { name: "Sprints" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Sprint 1")).toBeVisible();
});
