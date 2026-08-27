import { test, expect } from "@playwright/test";
test("loads presentations page", async ({ page }) => {
  await page.goto("/presentations");
  await expect(page.getByRole("heading", { name: "Presentations" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Welcome")).toBeVisible();
});
