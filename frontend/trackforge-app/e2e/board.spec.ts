import { test, expect } from "@playwright/test";

test("loads board with columns and cards", async ({ page }) => {
  await page.goto("/projects/p-1/board");
  await expect(page.getByText("Engineering")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("To Do")).toBeVisible();
  await expect(page.getByText("In Progress")).toBeVisible();
  await expect(page.getByText("Done")).toBeVisible();
  await expect(page.getByText("Implement user authentication")).toBeVisible();
});
