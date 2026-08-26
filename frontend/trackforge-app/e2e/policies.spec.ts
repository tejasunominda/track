import { test, expect } from "@playwright/test";

test("loads policies page", async ({ page }) => {
  await page.goto("/policies");
  await expect(page.getByRole("heading", { name: "Policies" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Policy A", { exact: true })).toBeVisible();
});
