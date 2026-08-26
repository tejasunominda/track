import { test, expect } from "@playwright/test";

test("loads portfolio page", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { name: "Portfolio" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Programs")).toBeVisible();
});
