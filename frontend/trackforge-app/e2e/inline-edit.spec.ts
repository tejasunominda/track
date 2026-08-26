import { test, expect } from "@playwright/test";

test("updates assignee, priority, and status inline", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByText("Implement user authentication", { exact: true })).toBeVisible({ timeout: 10000 });

  await page.locator("select", { hasText: "Unassigned" }).first().selectOption("u-2");
  await expect(page.getByText("Assignee updated", { exact: true })).toBeVisible({ timeout: 5000 });

  await page.getByRole("combobox").nth(1).selectOption("High");
  await expect(page.getByText("Priority updated", { exact: true })).toBeVisible({ timeout: 5000 });

  await page.getByRole("combobox").nth(2).selectOption("Done");
  await expect(page.getByText("Status updated", { exact: true })).toBeVisible({ timeout: 5000 });
});
