import { test, expect } from "@playwright/test";

test("loads copy page", async ({ page }) => {
  await page.goto("/copy");
  await expect(page.getByRole("heading", { name: "Copy" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Duplicate", { exact: true })).toBeVisible();
});
