import { test, expect } from "@playwright/test";

test("loads work instructions page", async ({ page }) => {
  await page.goto("/work-instructions");
  await expect(page.getByRole("heading", { name: "Work instructions" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Step 1", { exact: true })).toBeVisible();
});
