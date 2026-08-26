import { test, expect } from "@playwright/test";

test("loads skills matrix page", async ({ page }) => {
  await page.goto("/skills-matrix");
  await expect(page.getByRole("heading", { name: "Skills matrix" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("React", { exact: true })).toBeVisible();
});
