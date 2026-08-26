import { test, expect } from "@playwright/test";

test("loads roadmap page", async ({ page }) => {
  await page.goto("/roadmap");
  await expect(page.getByRole("heading", { name: "Roadmap" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Q1 goals")).toBeVisible();
});
