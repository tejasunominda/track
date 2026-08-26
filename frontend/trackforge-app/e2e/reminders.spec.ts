import { test, expect } from "@playwright/test";

test("loads reminders page", async ({ page }) => {
  await page.goto("/reminders");
  await expect(page.getByRole("heading", { name: "Reminders" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Due tomorrow", { exact: true })).toBeVisible();
});
