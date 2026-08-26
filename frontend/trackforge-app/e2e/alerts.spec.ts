import { test, expect } from "@playwright/test";

test("loads alerts page", async ({ page }) => {
  await page.goto("/alerts");
  await expect(page.getByRole("heading", { name: "Alerts" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("P1", { exact: true })).toBeVisible();
});
