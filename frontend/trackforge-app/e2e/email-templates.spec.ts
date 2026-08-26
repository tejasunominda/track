import { test, expect } from "@playwright/test";

test("loads email templates page", async ({ page }) => {
  await page.goto("/email-templates");
  await expect(page.getByRole("heading", { name: "Email templates" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Email 1", { exact: true })).toBeVisible();
});
