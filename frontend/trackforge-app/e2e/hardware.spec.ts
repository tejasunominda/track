import { test, expect } from "@playwright/test";

test("loads hardware page", async ({ page }) => {
  await page.goto("/hardware");
  await expect(page.getByRole("heading", { name: "Hardware" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("MacBook", { exact: true })).toBeVisible();
});
