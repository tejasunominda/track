import { test, expect } from "@playwright/test";

test("loads groups page", async ({ page }) => {
  await page.goto("/groups");
  await expect(page.getByRole("heading", { name: "Groups" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Engineering", { exact: true })).toBeVisible();
});
