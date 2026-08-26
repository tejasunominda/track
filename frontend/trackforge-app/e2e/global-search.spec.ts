import { test, expect } from "@playwright/test";

test("global top-bar search finds and opens an issue", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  const input = page.getByPlaceholder("Search issues, projects, filters…");
  await input.fill("authentication");
  await page.getByText("Implement user authentication").click();
  await expect(page).toHaveURL(/\/issues\/i-1/);
  await expect(page.getByText("Implement user authentication", { exact: true })).toBeVisible();
});
