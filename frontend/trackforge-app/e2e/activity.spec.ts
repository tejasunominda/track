import { test, expect } from "@playwright/test";

test("loads activity page", async ({ page }) => {
  await page.goto("/activity");
  await expect(page.getByRole("heading", { name: "Activity" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Alice")).toBeVisible();
});
