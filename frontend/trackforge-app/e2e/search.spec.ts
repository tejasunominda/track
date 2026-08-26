import { test, expect } from "@playwright/test";

test("loads global search page", async ({ page }) => {
  await page.goto("/search");
  await expect(page.getByText("Search issues", { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
});
