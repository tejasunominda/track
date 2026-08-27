import { test, expect } from "@playwright/test";
test("loads link page", async ({ page }) => {
  await page.goto("/link");
  await expect(page.getByRole("heading", { name: "Links" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("https://github.com/track/eng/pull/42")).toBeVisible();
});
