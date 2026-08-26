import { test, expect } from "@playwright/test";

test("loads billing page", async ({ page }) => {
  await page.goto("/billing");
  await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Active plan")).toBeVisible();
});
