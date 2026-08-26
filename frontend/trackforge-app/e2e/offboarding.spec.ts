import { test, expect } from "@playwright/test";

test("loads offboarding page", async ({ page }) => {
  await page.goto("/offboarding");
  await expect(page.getByRole("heading", { name: "Offboarding" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Exit", { exact: true })).toBeVisible();
});
