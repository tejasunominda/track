import { test, expect } from "@playwright/test";

test("loads deployments page", async ({ page }) => {
  await page.goto("/deployments");
  await expect(page.getByRole("heading", { name: "Deployments" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Build 99", { exact: true })).toBeVisible();
});
