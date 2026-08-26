import { test, expect } from "@playwright/test";

test("toggles watch and star on an issue", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByText("Implement user authentication", { exact: true })).toBeVisible({ timeout: 10000 });

  const watch = page.getByRole("button", { name: /Watch/ });
  await watch.click();
  await expect(page.getByText("Watching issue", { exact: true })).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Watching" }).click();
  await expect(page.getByText("Stopped watching", { exact: true })).toBeVisible({ timeout: 5000 });

  const star = page.getByRole("button", { name: "Star" });
  await star.click();
  await expect(page.getByText("Starred", { exact: true })).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Starred" }).click();
  await expect(page.getByText("Unstarred", { exact: true })).toBeVisible({ timeout: 5000 });
});
