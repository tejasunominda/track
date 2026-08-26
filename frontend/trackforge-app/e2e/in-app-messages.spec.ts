import { test, expect } from "@playwright/test";

test("loads in-app messages page", async ({ page }) => {
  await page.goto("/in-app-messages");
  await expect(page.getByRole("heading", { name: "In-app messages" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("In-app", { exact: true })).toBeVisible();
});
