import { test, expect } from "@playwright/test";
test("loads subscriptions page", async ({ page }) => {
  await page.goto("/subscriptions");
  await expect(page.getByRole("heading", { name: "Subscriptions" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Professional" })).toBeVisible();
});
