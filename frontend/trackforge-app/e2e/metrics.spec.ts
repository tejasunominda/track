import { test, expect } from "@playwright/test";

test("loads metrics page", async ({ page }) => {
  await page.goto("/metrics");
  await expect(page.getByRole("heading", { name: "Metrics" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("CPU usage", { exact: true })).toBeVisible();
});
