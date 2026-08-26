import { test, expect } from "@playwright/test";

test("loads import page", async ({ page }) => {
  await page.goto("/import");
  await expect(page.getByRole("heading", { name: "Import" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Click to upload a CSV file")).toBeVisible();
});
