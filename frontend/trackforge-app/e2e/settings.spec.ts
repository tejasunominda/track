import { test, expect } from "@playwright/test";

test("loads settings page", async ({ page }) => {
  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Organization name")).toBeVisible();
});
