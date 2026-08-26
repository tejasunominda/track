import { test, expect } from "@playwright/test";

test("loads resource planning page", async ({ page }) => {
  await page.goto("/resource-planning");
  await expect(page.getByRole("heading", { name: "Resource planning" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Resource A", { exact: true })).toBeVisible();
});
