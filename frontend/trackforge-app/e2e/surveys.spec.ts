import { test, expect } from "@playwright/test";

test("loads surveys page", async ({ page }) => {
  await page.goto("/surveys");
  await expect(page.getByRole("heading", { name: "Surveys" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("CSAT", { exact: true })).toBeVisible();
});
