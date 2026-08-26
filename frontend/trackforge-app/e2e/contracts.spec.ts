import { test, expect } from "@playwright/test";

test("loads contracts page", async ({ page }) => {
  await page.goto("/contracts");
  await expect(page.getByRole("heading", { name: "Contracts" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Enterprise SLA")).toBeVisible();
});
