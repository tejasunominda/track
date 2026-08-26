import { test, expect } from "@playwright/test";

test("loads on-call page", async ({ page }) => {
  await page.goto("/on-call");
  await expect(page.getByRole("heading", { name: "On-call" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("On-call roster", { exact: true })).toBeVisible();
});
