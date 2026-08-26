import { test, expect } from "@playwright/test";

test("loads move page", async ({ page }) => {
  await page.goto("/move");
  await expect(page.getByRole("heading", { name: "Move" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Move to", { exact: true })).toBeVisible();
});
