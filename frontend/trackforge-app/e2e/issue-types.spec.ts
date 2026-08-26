import { test, expect } from "@playwright/test";

test("loads issue types page", async ({ page }) => {
  await page.goto("/issue-types");
  await expect(page.getByRole("heading", { name: "Issue types" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Story", { exact: true })).toBeVisible();
});
