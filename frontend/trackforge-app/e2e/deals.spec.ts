import { test, expect } from "@playwright/test";

test("loads deals page", async ({ page }) => {
  await page.goto("/deals");
  await expect(page.getByRole("heading", { name: "Deals" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Enterprise renewal")).toBeVisible();
});
