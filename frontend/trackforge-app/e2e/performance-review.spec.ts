import { test, expect } from "@playwright/test";

test("loads performance review page", async ({ page }) => {
  await page.goto("/performance-review");
  await expect(page.getByRole("heading", { name: "Performance review" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Review Q1", { exact: true })).toBeVisible();
});
