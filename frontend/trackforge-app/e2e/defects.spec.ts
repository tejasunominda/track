import { test, expect } from "@playwright/test";

test("loads defects page", async ({ page }) => {
  await page.goto("/defects");
  await expect(page.getByRole("heading", { name: "Defects" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Minor", { exact: true })).toBeVisible();
});
