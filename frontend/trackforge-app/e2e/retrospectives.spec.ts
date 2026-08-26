import { test, expect } from "@playwright/test";

test("loads retrospectives page", async ({ page }) => {
  await page.goto("/retrospectives");
  await expect(page.getByRole("heading", { name: "Retrospectives" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Sprint retro", { exact: true })).toBeVisible();
});
