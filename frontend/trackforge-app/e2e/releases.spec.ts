import { test, expect } from "@playwright/test";

test("loads releases page", async ({ page }) => {
  await page.goto("/releases");
  await expect(page.getByRole("heading", { name: "Releases" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("v1.0.0")).toBeVisible();
});
