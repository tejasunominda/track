import { test, expect } from "@playwright/test";

test("loads checklists page", async ({ page }) => {
  await page.goto("/checklists");
  await expect(page.getByRole("heading", { name: "Checklists" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Checklist", { exact: true })).toBeVisible();
});
