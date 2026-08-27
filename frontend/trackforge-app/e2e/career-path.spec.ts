import { test, expect } from "@playwright/test";

test("loads career path page", async ({ page }) => {
  await page.goto("/career-path");
  await expect(page.getByRole("heading", { name: "Career path" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Senior", { exact: true }).first()).toBeVisible();
});
