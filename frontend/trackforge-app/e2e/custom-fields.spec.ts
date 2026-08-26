import { test, expect } from "@playwright/test";

test("loads custom fields page", async ({ page }) => {
  await page.goto("/custom-fields");
  await expect(page.getByRole("heading", { name: "Custom fields" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Severity")).toBeVisible();
});
