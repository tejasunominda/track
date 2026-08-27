import { test, expect } from "@playwright/test";
test("loads color schemes page", async ({ page }) => {
  await page.goto("/color-schemes");
  await expect(page.getByRole("heading", { name: "Color schemes" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Ocean Blue")).toBeVisible();
});
