import { test, expect } from "@playwright/test";

test("loads trash page", async ({ page }) => {
  await page.goto("/trash");
  await expect(page.getByRole("heading", { name: "Trash" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Deleted issue", { exact: true })).toBeVisible();
});
