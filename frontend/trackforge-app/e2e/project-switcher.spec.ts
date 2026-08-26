import { test, expect } from "@playwright/test";

test("switches project from the top bar dropdown", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  await page.getByRole("button", { name: /Engineering/ }).click();
  await page.getByText("Marketing").click();
  await expect(page).toHaveURL(/\/projects\/p-2/);
  await expect(page.getByText("Marketing", { exact: true }).first()).toBeVisible();
});
