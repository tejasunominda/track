import { test, expect } from "@playwright/test";

test("loads teams page", async ({ page }) => {
  await page.goto("/teams");
  await expect(page.getByRole("heading", { name: "Teams" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("DevOps", { exact: true })).toBeVisible();
});
