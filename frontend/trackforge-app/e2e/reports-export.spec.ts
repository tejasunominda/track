import { test, expect } from "@playwright/test";

test("loads reports export page", async ({ page }) => {
  await page.goto("/reports-export");
  await expect(page.getByRole("heading", { name: "Reports export" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("PDF", { exact: true })).toBeVisible();
});
