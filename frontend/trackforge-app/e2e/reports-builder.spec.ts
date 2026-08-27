import { test, expect } from "@playwright/test";
test("loads reports builder page", async ({ page }) => {
  await page.goto("/reports-builder");
  await expect(page.getByRole("heading", { name: "Reports builder" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Issues by status")).toBeVisible();
});
