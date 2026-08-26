import { test, expect } from "@playwright/test";

test("loads people page", async ({ page }) => {
  await page.goto("/people");
  await expect(page.getByRole("heading", { name: "People" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Alice")).toBeVisible();
});
