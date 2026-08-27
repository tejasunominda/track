import { test, expect } from "@playwright/test";

test("loads task dependencies page", async ({ page }) => {
  await page.goto("/task-dependencies");
  await expect(page.getByRole("heading", { name: "Task dependencies" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("ENG-1")).toBeVisible();
});
