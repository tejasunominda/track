import { test, expect } from "@playwright/test";

test("loads versions page", async ({ page }) => {
  await page.goto("/versions");
  await expect(page.getByRole("heading", { name: "Versions" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("1.0.0")).toBeVisible();
});
