import { test, expect } from "@playwright/test";

test("loads quotes page", async ({ page }) => {
  await page.goto("/quotes");
  await expect(page.getByRole("heading", { name: "Quotes" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Quote 123", { exact: true })).toBeVisible();
});
