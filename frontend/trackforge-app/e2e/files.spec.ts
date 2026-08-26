import { test, expect } from "@playwright/test";

test("loads files page", async ({ page }) => {
  await page.goto("/files");
  await expect(page.getByRole("heading", { name: "Files" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("File 1", { exact: true })).toBeVisible();
});
