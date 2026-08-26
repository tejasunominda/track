import { test, expect } from "@playwright/test";

test("loads components page", async ({ page }) => {
  await page.goto("/components");
  await expect(page.getByRole("heading", { name: "Components" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Authentication")).toBeVisible();
});
