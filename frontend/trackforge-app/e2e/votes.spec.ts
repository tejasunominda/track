import { test, expect } from "@playwright/test";
test("loads votes page", async ({ page }) => {
  await page.goto("/votes");
  await expect(page.getByRole("heading", { name: "Votes" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Add dark mode")).toBeVisible();
});
