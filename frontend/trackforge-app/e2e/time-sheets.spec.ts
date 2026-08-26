import { test, expect } from "@playwright/test";

test("loads time sheets page", async ({ page }) => {
  await page.goto("/time-sheets");
  await expect(page.getByRole("heading", { name: "Time sheets" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Submitted", { exact: true })).toBeVisible();
});
