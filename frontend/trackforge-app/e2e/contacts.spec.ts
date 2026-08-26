import { test, expect } from "@playwright/test";

test("loads contacts page", async ({ page }) => {
  await page.goto("/contacts");
  await expect(page.getByRole("heading", { name: "Contacts" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("John Doe", { exact: true })).toBeVisible();
});
