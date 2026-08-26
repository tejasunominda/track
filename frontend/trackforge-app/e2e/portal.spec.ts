import { test, expect } from "@playwright/test";

test("loads portal page", async ({ page }) => {
  await page.goto("/portal");
  await expect(page.getByRole("heading", { name: "Portal" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Customer portal", { exact: true })).toBeVisible();
});
