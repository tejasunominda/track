import { test, expect } from "@playwright/test";

test("loads assets page", async ({ page }) => {
  await page.goto("/assets");
  await expect(page.getByRole("heading", { name: "Assets" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Logo", { exact: true })).toBeVisible();
});
