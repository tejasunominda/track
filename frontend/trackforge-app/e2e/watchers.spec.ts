import { test, expect } from "@playwright/test";
test("loads watchers page", async ({ page }) => {
  await page.goto("/watchers");
  await expect(page.getByRole("heading", { name: "Watchers" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Fix login bug")).toBeVisible();
});
