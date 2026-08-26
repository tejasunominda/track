import { test, expect } from "@playwright/test";

test("loads issue list and opens issue detail", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  await expect(page.getByText("Implement user authentication")).toBeVisible({ timeout: 10000 });
  await page.getByText("Implement user authentication").first().click();
  await expect(page.getByText("Add login and signup flows with JWT tokens.")).toBeVisible();
  await expect(page.getByText("Comments")).toBeVisible();
  await expect(page.getByText("Attachments")).toBeVisible();
});
