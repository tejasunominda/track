import { test, expect } from "@playwright/test";

test("loads bookmarks page", async ({ page }) => {
  await page.goto("/bookmarks");
  await expect(page.getByRole("heading", { name: "Bookmarks" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Saved query", { exact: true })).toBeVisible();
});
