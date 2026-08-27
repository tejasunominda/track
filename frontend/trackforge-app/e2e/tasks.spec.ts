import { test, expect } from "@playwright/test";

test("loads tasks page", async ({ page }) => {
  await page.goto("/tasks");
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Review pull requests")).toBeVisible();
});
