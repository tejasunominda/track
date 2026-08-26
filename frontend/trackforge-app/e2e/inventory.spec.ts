import { test, expect } from "@playwright/test";

test("loads inventory page", async ({ page }) => {
  await page.goto("/inventory");
  await expect(page.getByRole("heading", { name: "Inventory" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Laptop", { exact: true })).toBeVisible();
});
