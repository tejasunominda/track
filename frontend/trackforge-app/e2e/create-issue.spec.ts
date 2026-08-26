import { test, expect } from "@playwright/test";

test("creates a new issue from the issues page", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  await page.getByRole("button", { name: "Create issue" }).first().click();
  await expect(page.getByRole("heading", { name: "Create issue" })).toBeVisible({ timeout: 10000 });
  await page.getByPlaceholder("What needs to be done?").fill("New test issue");
  await page.locator('button[type="submit"]').getByText("Create issue").click();
  await expect(page.getByText("New test issue", { exact: true })).toBeVisible({ timeout: 10000 });
});
