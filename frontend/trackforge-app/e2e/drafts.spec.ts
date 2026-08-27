import { test, expect } from "@playwright/test";
test("loads drafts page", async ({ page }) => {
  await page.goto("/drafts");
  await expect(page.getByRole("heading", { name: "Drafts" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Q1 roadmap draft")).toBeVisible();
});
