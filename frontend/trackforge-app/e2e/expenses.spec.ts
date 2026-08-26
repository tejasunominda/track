import { test, expect } from "@playwright/test";

test("loads expenses page", async ({ page }) => {
  await page.goto("/expenses");
  await expect(page.getByRole("heading", { name: "Expenses" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Receipt", { exact: true })).toBeVisible();
});
