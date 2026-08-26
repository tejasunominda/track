import { test, expect } from "@playwright/test";

test("loads job descriptions page", async ({ page }) => {
  await page.goto("/job-descriptions");
  await expect(page.getByRole("heading", { name: "Job descriptions" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Engineer", { exact: true })).toBeVisible();
});
