import { test, expect } from "@playwright/test";

test("loads security page", async ({ page }) => {
  await page.goto("/security");
  await expect(page.getByRole("heading", { name: "Security" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Multi-factor authentication")).toBeVisible();
});
