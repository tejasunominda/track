import { test, expect } from "@playwright/test";

test("loads archive page", async ({ page }) => {
  await page.goto("/archive");
  await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Closed")).toBeVisible();
});
