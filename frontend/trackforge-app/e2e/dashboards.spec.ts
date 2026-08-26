import { test, expect } from "@playwright/test";

test("loads dashboards page", async ({ page }) => {
  await page.goto("/dashboards");
  await expect(page.getByRole("heading", { name: "Dashboards" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Open issues")).toBeVisible();
});
