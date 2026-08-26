import { test, expect } from "@playwright/test";

test("loads invoices page", async ({ page }) => {
  await page.goto("/invoices");
  await expect(page.getByRole("heading", { name: "Invoices" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Invoice 1", { exact: true })).toBeVisible();
});
