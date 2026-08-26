import { test, expect } from "@playwright/test";

test("loads profile page", async ({ page }) => {
  await page.goto("/profile");
  await expect(page.getByText("Your profile", { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("button", { name: "Edit profile" })).toBeVisible();
});
