import { test, expect } from "@playwright/test";

test("loads workflows page", async ({ page }) => {
  await page.goto("/workflows");
  await expect(page.getByRole("heading", { name: "Workflows" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("To Do")).toBeVisible();
});
