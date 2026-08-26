import { test, expect } from "@playwright/test";

test("loads invoices received page", async ({ page }) => {
  await page.goto("/invoices-received");
  await expect(page.getByRole("heading", { name: "Invoices received" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Vendor invoice", { exact: true })).toBeVisible();
});
