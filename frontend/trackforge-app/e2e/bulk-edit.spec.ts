import { test, expect } from "@playwright/test";
test("loads bulk edit page", async ({ page }) => {
  await page.goto("/bulk-edit");
  await expect(page.getByRole("heading", { name: "Bulk edit" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Fix login bug")).toBeVisible();
});
