import { test, expect } from "@playwright/test";

test("loads spreadsheets page", async ({ page }) => {
  await page.goto("/spreadsheets");
  await expect(page.getByRole("heading", { name: "Spreadsheets" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Sheet 1", { exact: true })).toBeVisible();
});
