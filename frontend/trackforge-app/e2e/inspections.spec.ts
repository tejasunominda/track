import { test, expect } from "@playwright/test";

test("loads inspections page", async ({ page }) => {
  await page.goto("/inspections");
  await expect(page.getByRole("heading", { name: "Inspections" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Pass", { exact: true })).toBeVisible();
});
