import { test, expect } from "@playwright/test";

test("loads leads page", async ({ page }) => {
  await page.goto("/leads");
  await expect(page.getByRole("heading", { name: "Leads" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Qualified", { exact: true })).toBeVisible();
});
