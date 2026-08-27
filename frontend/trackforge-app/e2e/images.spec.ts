import { test, expect } from "@playwright/test";
test("loads images page", async ({ page }) => {
  await page.goto("/images");
  await expect(page.getByRole("heading", { name: "Images" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("screenshot-bug.png")).toBeVisible();
});
