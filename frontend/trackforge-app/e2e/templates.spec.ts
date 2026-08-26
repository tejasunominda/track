import { test, expect } from "@playwright/test";

test("loads templates page", async ({ page }) => {
  await page.goto("/templates");
  await expect(page.getByRole("heading", { name: "Templates" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Bug template", { exact: true })).toBeVisible();
});
