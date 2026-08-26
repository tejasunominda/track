import { test, expect } from "@playwright/test";

test("loads customers page", async ({ page }) => {
  await page.goto("/customers");
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Acme Corp", { exact: true })).toBeVisible();
});
