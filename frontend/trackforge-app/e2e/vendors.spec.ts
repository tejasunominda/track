import { test, expect } from "@playwright/test";

test("loads vendors page", async ({ page }) => {
  await page.goto("/vendors");
  await expect(page.getByRole("heading", { name: "Vendors" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Vendor X", { exact: true })).toBeVisible();
});
