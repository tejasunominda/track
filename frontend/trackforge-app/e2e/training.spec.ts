import { test, expect } from "@playwright/test";

test("loads training page", async ({ page }) => {
  await page.goto("/training");
  await expect(page.getByRole("heading", { name: "Training" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Course 1", { exact: true })).toBeVisible();
});
