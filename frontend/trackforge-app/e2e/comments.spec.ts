import { test, expect } from "@playwright/test";

test("adds a comment to an issue", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByText("Implement user authentication")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("I can take this one.")).toBeVisible();

  const input = page.getByPlaceholder("Add a comment…");
  await input.fill("Test comment from Playwright");
  await page.getByRole("button", { name: "Post" }).click();

  await expect(page.getByText("Test comment from Playwright")).toBeVisible();
});
