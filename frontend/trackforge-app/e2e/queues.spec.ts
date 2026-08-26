import { test, expect } from "@playwright/test";

test("loads queues page", async ({ page }) => {
  await page.goto("/queues");
  await expect(page.getByRole("heading", { name: "Queues" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Open queue", { exact: true })).toBeVisible();
});
