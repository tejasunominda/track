import { test, expect } from "@playwright/test";

test("loads postmortems page", async ({ page }) => {
  await page.goto("/postmortems");
  await expect(page.getByRole("heading", { name: "Postmortems" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Root cause", { exact: true })).toBeVisible();
});
