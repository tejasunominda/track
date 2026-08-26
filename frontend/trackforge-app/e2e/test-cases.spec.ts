import { test, expect } from "@playwright/test";

test("loads test cases page", async ({ page }) => {
  await page.goto("/test-cases");
  await expect(page.getByRole("heading", { name: "Test cases" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Test case A", { exact: true })).toBeVisible();
});
