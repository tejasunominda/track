import { test, expect } from "@playwright/test";

test("loads roles page", async ({ page }) => {
  await page.goto("/roles");
  await expect(page.getByRole("heading", { name: "Roles" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Owner", { exact: true })).toBeVisible();
});
