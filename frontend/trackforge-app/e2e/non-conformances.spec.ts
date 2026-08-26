import { test, expect } from "@playwright/test";

test("loads non-conformances page", async ({ page }) => {
  await page.goto("/non-conformances");
  await expect(page.getByRole("heading", { name: "Non-conformances" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("NC-22", { exact: true })).toBeVisible();
});
