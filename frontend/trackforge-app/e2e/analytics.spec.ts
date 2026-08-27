import { test, expect } from "@playwright/test";

test("loads analytics page", async ({ page }) => {
  await page.goto("/analytics");
  await expect(page.getByRole("heading", { name: "Analytics" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Total issues")).toBeVisible();
});
