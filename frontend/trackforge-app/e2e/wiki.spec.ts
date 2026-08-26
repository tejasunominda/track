import { test, expect } from "@playwright/test";

test("loads wiki page", async ({ page }) => {
  await page.goto("/wiki");
  await expect(page.getByRole("heading", { name: "Wiki" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Home page", { exact: true })).toBeVisible();
});
