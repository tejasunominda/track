import { test, expect } from "@playwright/test";

test("loads compliance page", async ({ page }) => {
  await page.goto("/compliance");
  await expect(page.getByRole("heading", { name: "Compliance" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("GDPR", { exact: true })).toBeVisible();
});
