import { test, expect } from "@playwright/test";

test("loads labels page", async ({ page }) => {
  await page.goto("/labels");
  await expect(page.getByRole("heading", { name: "Labels" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Bug")).toBeVisible();
});
