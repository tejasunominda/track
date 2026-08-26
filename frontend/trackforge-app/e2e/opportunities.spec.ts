import { test, expect } from "@playwright/test";

test("loads opportunities page", async ({ page }) => {
  await page.goto("/opportunities");
  await expect(page.getByRole("heading", { name: "Opportunities" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Expansion", { exact: true })).toBeVisible();
});
