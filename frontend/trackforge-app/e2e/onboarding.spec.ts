import { test, expect } from "@playwright/test";

test("loads onboarding page", async ({ page }) => {
  await page.goto("/onboarding");
  await expect(page.getByRole("heading", { name: "Onboarding" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("New hire", { exact: true })).toBeVisible();
});
