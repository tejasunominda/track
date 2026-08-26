import { test, expect } from "@playwright/test";

test("loads shipments page", async ({ page }) => {
  await page.goto("/shipments");
  await expect(page.getByRole("heading", { name: "Shipments" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Shipped", { exact: true })).toBeVisible();
});
