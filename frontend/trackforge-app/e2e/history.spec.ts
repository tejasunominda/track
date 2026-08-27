import { test, expect } from "@playwright/test";
test("loads history page", async ({ page }) => {
  await page.goto("/history");
  await expect(page.getByRole("heading", { name: "History" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Alice").first()).toBeVisible();
});
