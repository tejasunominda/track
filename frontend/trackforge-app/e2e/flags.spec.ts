import { test, expect } from "@playwright/test";
test("loads flags page", async ({ page }) => {
  await page.goto("/flags");
  await expect(page.getByRole("heading", { name: "Flags" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Needs design review")).toBeVisible();
});
