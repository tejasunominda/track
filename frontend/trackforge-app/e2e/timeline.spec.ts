import { test, expect } from "@playwright/test";
test("loads timeline page", async ({ page }) => {
  await page.goto("/timeline");
  await expect(page.getByRole("heading", { name: "Timeline" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Design phase")).toBeVisible();
});
