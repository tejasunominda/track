import { test, expect } from "@playwright/test";

test("loads recycle bin page", async ({ page }) => {
  await page.goto("/recycle-bin");
  await expect(page.getByRole("heading", { name: "Recycle bin" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Restore", { exact: true })).toBeVisible();
});
