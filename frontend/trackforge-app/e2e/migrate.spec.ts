import { test, expect } from "@playwright/test";
test("loads migrate page", async ({ page }) => {
  await page.goto("/migrate");
  await expect(page.getByRole("heading", { name: "Migrate" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Jira import")).toBeVisible();
});
