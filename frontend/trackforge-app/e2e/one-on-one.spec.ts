import { test, expect } from "@playwright/test";

test("loads 1:1s page", async ({ page }) => {
  await page.goto("/one-on-one");
  await expect(page.getByRole("heading", { name: "1:1s" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("main").getByText("Goals")).toBeVisible();
});
