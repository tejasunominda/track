import { test, expect } from "@playwright/test";

test("logs work on an issue", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByRole("heading", { name: "Implement user authentication" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Initial setup")).toBeVisible();
  await page.getByPlaceholder("Minutes").fill("45");
  await page.getByPlaceholder("Description (optional)").fill("Refined auth flow");
  await page.getByRole("button", { name: "Log work" }).click();
  await expect(page.getByText("Refined auth flow")).toBeVisible();
  await expect(page.getByText("45m", { exact: true }).first()).toBeVisible();
});
