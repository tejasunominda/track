import { test, expect } from "@playwright/test";

test("loads change log page", async ({ page }) => {
  await page.goto("/change-log");
  await expect(page.getByRole("heading", { name: "Change log" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("v2.0 changes", { exact: true })).toBeVisible();
});
