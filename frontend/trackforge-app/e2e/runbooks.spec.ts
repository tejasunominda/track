import { test, expect } from "@playwright/test";
test("loads runbooks page", async ({ page }) => {
  await page.goto("/runbooks");
  await expect(page.getByRole("heading", { name: "Runbooks" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Deploy to production")).toBeVisible();
});
