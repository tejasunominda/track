import { test, expect } from "@playwright/test";

test("loads mind map page", async ({ page }) => {
  await page.goto("/mind-map");
  await expect(page.getByRole("heading", { name: "Mind map" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Map 1", { exact: true })).toBeVisible();
});
