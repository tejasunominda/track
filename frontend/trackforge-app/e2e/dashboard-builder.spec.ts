import { test, expect } from "@playwright/test";

test("loads dashboard builder page", async ({ page }) => {
  await page.goto("/dashboard-builder");
  await expect(page.getByRole("heading", { name: "Dashboard builder" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Widget A", { exact: true })).toBeVisible();
});
