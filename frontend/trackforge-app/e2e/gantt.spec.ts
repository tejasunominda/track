import { test, expect } from "@playwright/test";

test("loads gantt page", async ({ page }) => {
  await page.goto("/gantt");
  await expect(page.getByRole("heading", { name: "Gantt" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Gantt view", { exact: true })).toBeVisible();
});
