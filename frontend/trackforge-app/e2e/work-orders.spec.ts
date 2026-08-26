import { test, expect } from "@playwright/test";

test("loads work orders page", async ({ page }) => {
  await page.goto("/work-orders");
  await expect(page.getByRole("heading", { name: "Work orders" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("WO 555", { exact: true })).toBeVisible();
});
