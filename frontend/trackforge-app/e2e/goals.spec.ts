import { test, expect } from "@playwright/test";

test("loads goals page", async ({ page }) => {
  await page.goto("/goals");
  await expect(page.getByRole("heading", { name: "Goals" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Q1 target", { exact: true })).toBeVisible();
});
