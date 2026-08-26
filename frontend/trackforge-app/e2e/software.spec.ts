import { test, expect } from "@playwright/test";

test("loads software page", async ({ page }) => {
  await page.goto("/software");
  await expect(page.getByRole("heading", { name: "Software" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("License", { exact: true })).toBeVisible();
});
