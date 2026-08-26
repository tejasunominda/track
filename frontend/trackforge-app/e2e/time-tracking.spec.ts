import { test, expect } from "@playwright/test";

test("loads time tracking page", async ({ page }) => {
  await page.goto("/time-tracking");
  await expect(page.getByRole("heading", { name: "Time tracking" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Logged")).toBeVisible();
});
