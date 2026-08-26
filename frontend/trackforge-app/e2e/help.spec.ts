import { test, expect } from "@playwright/test";

test("loads help center page", async ({ page }) => {
  await page.goto("/help");
  await expect(page.getByText("Help center", { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Getting started with TrackForge")).toBeVisible();
});
