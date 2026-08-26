import { test, expect } from "@playwright/test";

test("loads test plans page", async ({ page }) => {
  await page.goto("/test-plans");
  await expect(page.getByRole("heading", { name: "Test plans" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Test plan 1", { exact: true })).toBeVisible();
});
