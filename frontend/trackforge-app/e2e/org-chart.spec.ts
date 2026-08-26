import { test, expect } from "@playwright/test";

test("loads org chart page", async ({ page }) => {
  await page.goto("/org-chart");
  await expect(page.getByRole("heading", { name: "Org chart" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("CEO", { exact: true })).toBeVisible();
});
