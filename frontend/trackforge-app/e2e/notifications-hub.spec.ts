import { test, expect } from "@playwright/test";
test("loads notifications hub page", async ({ page }) => {
  await page.goto("/notifications-hub");
  await expect(page.getByRole("heading", { name: "Notifications hub" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Team Slack")).toBeVisible();
});
