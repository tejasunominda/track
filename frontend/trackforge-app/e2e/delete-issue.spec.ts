import { test, expect } from "@playwright/test";

test("creates and deletes an issue", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  await page.getByRole("button", { name: "Create issue" }).first().click();
  await page.getByPlaceholder("What needs to be done?").fill("To be deleted");
  await page.locator('button[type="submit"]').getByText("Create issue").click();
  await page.getByText("To be deleted", { exact: true }).click();
  await page.getByRole("button", { name: "Delete issue" }).click();
  await page.goto("/projects/p-1/issues");
  await expect(page.getByText("To be deleted")).not.toBeVisible();
});
