import { test, expect } from "@playwright/test";
test("loads a/b tests page", async ({ page }) => {
  await page.goto("/a-b-tests");
  await expect(page.getByRole("heading", { name: "A/B tests" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("CTA button color")).toBeVisible();
});
