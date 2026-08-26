import { test, expect } from "@playwright/test";

test("loads permissions page", async ({ page }) => {
  await page.goto("/permissions");
  await expect(page.getByRole("heading", { name: "Permissions" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Admin", { exact: true }).first()).toBeVisible();
});
