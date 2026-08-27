import { test, expect } from "@playwright/test";
test("loads quality page", async ({ page }) => {
  await page.goto("/quality");
  await expect(page.getByRole("heading", { name: "Quality" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Smoke tests")).toBeVisible();
});
