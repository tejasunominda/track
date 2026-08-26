import { test, expect } from "@playwright/test";

test("loads orders page", async ({ page }) => {
  await page.goto("/orders");
  await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Order 456", { exact: true })).toBeVisible();
});
