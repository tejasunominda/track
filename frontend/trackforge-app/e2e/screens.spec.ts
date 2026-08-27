import { test, expect } from "@playwright/test";
test("loads screens page", async ({ page }) => {
  await page.goto("/screens");
  await expect(page.getByRole("heading", { name: "Screens" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Story create")).toBeVisible();
});
