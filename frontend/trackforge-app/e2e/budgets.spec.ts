import { test, expect } from "@playwright/test";

test("loads budgets page", async ({ page }) => {
  await page.goto("/budgets");
  await expect(page.getByRole("heading", { name: "Budgets" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Q1 budget", { exact: true })).toBeVisible();
});
