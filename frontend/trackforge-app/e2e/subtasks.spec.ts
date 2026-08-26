import { test, expect } from "@playwright/test";

test("loads subtasks page", async ({ page }) => {
  await page.goto("/subtasks");
  await expect(page.getByRole("heading", { name: "Subtasks" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Subtask A", { exact: true })).toBeVisible();
});
