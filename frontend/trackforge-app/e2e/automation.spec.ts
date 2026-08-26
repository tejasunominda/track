import { test, expect } from "@playwright/test";

test("loads automation page", async ({ page }) => {
  await page.goto("/automation");
  await expect(page.getByRole("heading", { name: "Automation" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Rules")).toBeVisible();
});
