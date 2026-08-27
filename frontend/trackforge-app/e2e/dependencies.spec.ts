import { test, expect } from "@playwright/test";
test("loads dependencies page", async ({ page }) => {
  await page.goto("/dependencies");
  await expect(page.getByRole("heading", { name: "Dependencies" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("blocks").first()).toBeVisible();
});
