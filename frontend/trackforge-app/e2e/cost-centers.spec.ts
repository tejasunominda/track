import { test, expect } from "@playwright/test";

test("loads cost centers page", async ({ page }) => {
  await page.goto("/cost-centers");
  await expect(page.getByRole("heading", { name: "Cost centers" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Engineering", { exact: true })).toBeVisible();
});
