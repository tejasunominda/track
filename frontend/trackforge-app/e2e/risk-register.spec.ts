import { test, expect } from "@playwright/test";

test("loads risk register page", async ({ page }) => {
  await page.goto("/risk-register");
  await expect(page.getByRole("heading", { name: "Risk register" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("High risk", { exact: true })).toBeVisible();
});
