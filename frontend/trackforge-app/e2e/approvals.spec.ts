import { test, expect } from "@playwright/test";

test("loads approvals page", async ({ page }) => {
  await page.goto("/approvals");
  await expect(page.getByRole("heading", { name: "Approvals" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Q2 budget request")).toBeVisible();
});
