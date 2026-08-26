import { test, expect } from "@playwright/test";

test("loads vacation page", async ({ page }) => {
  await page.goto("/vacation");
  await expect(page.getByRole("heading", { name: "Vacation" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("PTO", { exact: true })).toBeVisible();
});
