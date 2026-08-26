import { test, expect } from "@playwright/test";

test("loads certifications page", async ({ page }) => {
  await page.goto("/certifications");
  await expect(page.getByRole("heading", { name: "Certifications" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("AWS", { exact: true })).toBeVisible();
});
