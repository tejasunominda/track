import { test, expect } from "@playwright/test";

test("loads whiteboard page", async ({ page }) => {
  await page.goto("/whiteboard");
  await expect(page.getByRole("heading", { name: "Whiteboard" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Board 1", { exact: true })).toBeVisible();
});
