import { test, expect } from "@playwright/test";

test("loads boards page", async ({ page }) => {
  await page.goto("/boards");
  await expect(page.getByRole("heading", { name: "Boards" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Sprint board")).toBeVisible();
});
