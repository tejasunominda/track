import { test, expect } from "@playwright/test";

test("loads procurement page", async ({ page }) => {
  await page.goto("/procurement");
  await expect(page.getByRole("heading", { name: "Procurement" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Purchase", { exact: true })).toBeVisible();
});
