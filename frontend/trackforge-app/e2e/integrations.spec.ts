import { test, expect } from "@playwright/test";

test("loads integrations page", async ({ page }) => {
  await page.goto("/integrations");
  await expect(page.getByRole("heading", { name: "Integrations" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Slack")).toBeVisible();
});
