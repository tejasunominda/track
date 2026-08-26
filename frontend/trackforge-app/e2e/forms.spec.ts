import { test, expect } from "@playwright/test";

test("loads forms page", async ({ page }) => {
  await page.goto("/forms");
  await expect(page.getByRole("heading", { name: "Forms" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Request form", { exact: true })).toBeVisible();
});
