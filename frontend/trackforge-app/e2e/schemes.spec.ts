import { test, expect } from "@playwright/test";

test("loads schemes page", async ({ page }) => {
  await page.goto("/schemes");
  await expect(page.getByRole("heading", { name: "Schemes" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Default scheme", { exact: true })).toBeVisible();
});
