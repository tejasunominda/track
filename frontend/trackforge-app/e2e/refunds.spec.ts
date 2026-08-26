import { test, expect } from "@playwright/test";

test("loads refunds page", async ({ page }) => {
  await page.goto("/refunds");
  await expect(page.getByRole("heading", { name: "Refunds" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Refund 101", { exact: true })).toBeVisible();
});
