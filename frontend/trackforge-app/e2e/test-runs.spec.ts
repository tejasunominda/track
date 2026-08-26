import { test, expect } from "@playwright/test";

test("loads test runs page", async ({ page }) => {
  await page.goto("/test-runs");
  await expect(page.getByRole("heading", { name: "Test runs" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Run #42", { exact: true })).toBeVisible();
});
