import { test, expect } from "@playwright/test";

test("loads suppliers page", async ({ page }) => {
  await page.goto("/suppliers");
  await expect(page.getByRole("heading", { name: "Suppliers" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Supplier X", { exact: true })).toBeVisible();
});
