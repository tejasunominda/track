import { test, expect } from "@playwright/test";

test("loads feature flags page", async ({ page }) => {
  await page.goto("/feature-flags");
  await expect(page.getByRole("heading", { name: "Feature flags" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Enabled", { exact: true })).toBeVisible();
});
