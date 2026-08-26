import { test, expect } from "@playwright/test";

test("loads quick filters page", async ({ page }) => {
  await page.goto("/quick-filters");
  await expect(page.getByRole("heading", { name: "Quick filters" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Quick filter", { exact: true })).toBeVisible();
});
