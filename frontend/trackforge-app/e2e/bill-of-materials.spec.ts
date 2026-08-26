import { test, expect } from "@playwright/test";

test("loads bill of materials page", async ({ page }) => {
  await page.goto("/bill-of-materials");
  await expect(page.getByRole("heading", { name: "Bill of materials" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("BOM v1", { exact: true })).toBeVisible();
});
