import { test, expect } from "@playwright/test";

test("loads forecasts page", async ({ page }) => {
  await page.goto("/forecasts");
  await expect(page.getByRole("heading", { name: "Forecasts" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Revenue", { exact: true })).toBeVisible();
});
