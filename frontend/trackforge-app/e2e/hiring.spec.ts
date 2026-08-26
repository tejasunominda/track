import { test, expect } from "@playwright/test";

test("loads hiring page", async ({ page }) => {
  await page.goto("/hiring");
  await expect(page.getByRole("heading", { name: "Hiring" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Candidate", { exact: true })).toBeVisible();
});
