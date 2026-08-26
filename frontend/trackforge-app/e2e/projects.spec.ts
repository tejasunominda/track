import { test, expect } from "@playwright/test";

test("displays project cards and navigation links", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByText("Engineering", { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Marketing", { exact: true })).toBeVisible();
  await expect(page.getByText("Operations", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Board" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Issues" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Reports" }).first()).toBeVisible();
});
