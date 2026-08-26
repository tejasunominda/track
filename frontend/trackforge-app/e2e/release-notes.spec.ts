import { test, expect } from "@playwright/test";

test("loads release notes page", async ({ page }) => {
  await page.goto("/release-notes");
  await expect(page.getByRole("heading", { name: "Release notes" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Version notes", { exact: true })).toBeVisible();
});
