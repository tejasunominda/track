import { test, expect } from "@playwright/test";

test("loads incidents page", async ({ page }) => {
  await page.goto("/incidents");
  await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Incident 12", { exact: true })).toBeVisible();
});
