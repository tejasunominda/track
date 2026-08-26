import { test, expect } from "@playwright/test";

test("loads manufacturing page", async ({ page }) => {
  await page.goto("/manufacturing");
  await expect(page.getByRole("heading", { name: "Manufacturing" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Assembly A")).toBeVisible();
});
