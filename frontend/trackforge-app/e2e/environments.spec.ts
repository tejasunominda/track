import { test, expect } from "@playwright/test";

test("loads environments page", async ({ page }) => {
  await page.goto("/environments");
  await expect(page.getByRole("heading", { name: "Environments" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Production", { exact: true })).toBeVisible();
});
