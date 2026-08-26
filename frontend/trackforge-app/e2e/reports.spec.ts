import { test, expect } from "@playwright/test";

test("loads reports page with chart", async ({ page }) => {
  await page.goto("/projects/p-1/reports");
  await expect(page.getByRole("heading", { name: "Reports" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Sprint velocity")).toBeVisible();
});
