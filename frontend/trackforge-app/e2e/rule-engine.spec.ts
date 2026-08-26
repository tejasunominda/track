import { test, expect } from "@playwright/test";

test("loads rule engine page", async ({ page }) => {
  await page.goto("/rule-engine");
  await expect(page.getByRole("heading", { name: "Rule engine" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Auto-assign", { exact: true })).toBeVisible();
});
