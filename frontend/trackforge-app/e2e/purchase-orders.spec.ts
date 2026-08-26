import { test, expect } from "@playwright/test";

test("loads purchase orders page", async ({ page }) => {
  await page.goto("/purchase-orders");
  await expect(page.getByRole("heading", { name: "Purchase orders" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("PO 1001", { exact: true })).toBeVisible();
});
