import { test, expect } from "@playwright/test";

test("loads standups page", async ({ page }) => {
  await page.goto("/standups");
  await expect(page.getByRole("heading", { name: "Standups" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Working on API")).toBeVisible();
});
