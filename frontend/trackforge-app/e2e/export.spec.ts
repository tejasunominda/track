import { test, expect } from "@playwright/test";

test("loads export page", async ({ page }) => {
  await page.goto("/export");
  await expect(page.getByRole("heading", { name: "Export" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("JSON")).toBeVisible();
});
