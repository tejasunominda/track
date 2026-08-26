import { test, expect } from "@playwright/test";

test("loads service catalog page", async ({ page }) => {
  await page.goto("/service-catalog");
  await expect(page.getByRole("heading", { name: "Service catalog" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Service A", { exact: true })).toBeVisible();
});
