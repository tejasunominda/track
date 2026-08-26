import { test, expect } from "@playwright/test";

test("loads link page", async ({ page }) => {
  await page.goto("/link");
  await expect(page.getByRole("heading", { name: "Link" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Relates to", { exact: true })).toBeVisible();
});
