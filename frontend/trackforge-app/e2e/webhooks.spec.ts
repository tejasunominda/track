import { test, expect } from "@playwright/test";

test("loads webhooks page", async ({ page }) => {
  await page.goto("/webhooks");
  await expect(page.getByRole("heading", { name: "Webhooks" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("GitHub hook", { exact: true })).toBeVisible();
});
