import { test, expect } from "@playwright/test";

test("loads clone page", async ({ page }) => {
  await page.goto("/clone");
  await expect(page.getByRole("heading", { name: "Clone" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Clone of", { exact: true })).toBeVisible();
});
