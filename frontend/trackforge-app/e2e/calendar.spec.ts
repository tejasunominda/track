import { test, expect } from "@playwright/test";

test("loads calendar page", async ({ page }) => {
  await page.goto("/calendar");
  await expect(page.getByRole("heading", { name: "Calendar" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("March 2026", { exact: true })).toBeVisible();
});
