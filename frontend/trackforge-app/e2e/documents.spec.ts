import { test, expect } from "@playwright/test";

test("loads documents page", async ({ page }) => {
  await page.goto("/documents");
  await expect(page.getByRole("heading", { name: "Documents" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Doc A", { exact: true })).toBeVisible();
});
