import { test, expect } from "@playwright/test";

test("loads payments page", async ({ page }) => {
  await page.goto("/payments");
  await expect(page.getByRole("heading", { name: "Payments" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Payment 789", { exact: true })).toBeVisible();
});
