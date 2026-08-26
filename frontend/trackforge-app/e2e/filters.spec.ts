import { test, expect } from "@playwright/test";

test("loads filters page and creates a saved filter", async ({ page }) => {
  await page.goto("/filters");
  await expect(page.getByText("High priority bugs")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('type = "Bug" AND priority = "High"')).toBeVisible();

  await page.getByPlaceholder("Filter name").fill("Open tasks");
  await page.getByPlaceholder('e.g. type = "Bug" AND priority = "High"').fill('status = "To Do"');
  await page.getByRole("button", { name: "Save filter" }).click();

  await expect(page.getByText("Open tasks")).toBeVisible();
  await expect(page.getByText('status = "To Do"')).toBeVisible();
});
