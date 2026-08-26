import { test, expect } from "@playwright/test";

test("loads backlog page for a project", async ({ page }) => {
  await page.goto("/projects/p-1/backlog");
  await expect(page.getByRole("heading", { name: "Backlog" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Implement user authentication")).toBeVisible();
});
