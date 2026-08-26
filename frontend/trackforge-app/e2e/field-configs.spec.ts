import { test, expect } from "@playwright/test";

test("loads field configs page", async ({ page }) => {
  await page.goto("/field-configs");
  await expect(page.getByRole("heading", { name: "Field configs" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Required fields", { exact: true })).toBeVisible();
});
