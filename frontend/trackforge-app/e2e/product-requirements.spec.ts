import { test, expect } from "@playwright/test";

test("loads product requirements page", async ({ page }) => {
  await page.goto("/product-requirements");
  await expect(page.getByRole("heading", { name: "Product requirements" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Auth PRD")).toBeVisible();
});
