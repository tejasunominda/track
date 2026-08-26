import { test, expect } from "@playwright/test";

test("loads drawings page", async ({ page }) => {
  await page.goto("/drawings");
  await expect(page.getByRole("heading", { name: "Drawings" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Diagram", { exact: true })).toBeVisible();
});
