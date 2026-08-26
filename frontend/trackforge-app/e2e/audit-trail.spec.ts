import { test, expect } from "@playwright/test";

test("loads audit trail page", async ({ page }) => {
  await page.goto("/audit-trail");
  await expect(page.getByRole("heading", { name: "Audit trail" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Login event", { exact: true })).toBeVisible();
});
