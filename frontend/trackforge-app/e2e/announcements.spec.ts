import { test, expect } from "@playwright/test";

test("loads announcements page", async ({ page }) => {
  await page.goto("/announcements");
  await expect(page.getByRole("heading", { name: "Announcements" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Launch note", { exact: true })).toBeVisible();
});
