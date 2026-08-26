import { test, expect } from "@playwright/test";

test("loads notifications page", async ({ page }) => {
  await page.goto("/notifications");
  await expect(page.getByRole("heading", { name: "Notifications" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Alice commented on ENG-12")).toBeVisible();
});
