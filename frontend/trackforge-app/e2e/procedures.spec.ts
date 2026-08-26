import { test, expect } from "@playwright/test";

test("loads procedures page", async ({ page }) => {
  await page.goto("/procedures");
  await expect(page.getByRole("heading", { name: "Procedures" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Incident response")).toBeVisible();
});
