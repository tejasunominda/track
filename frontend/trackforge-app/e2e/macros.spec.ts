import { test, expect } from "@playwright/test";

test("loads macros page", async ({ page }) => {
  await page.goto("/macros");
  await expect(page.getByRole("heading", { name: "Macros" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Macro 1", { exact: true })).toBeVisible();
});
