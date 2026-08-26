import { test, expect } from "@playwright/test";

test("loads knowledge base page", async ({ page }) => {
  await page.goto("/knowledge-base");
  await expect(page.getByRole("heading", { name: "Knowledge base" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Getting started")).toBeVisible();
});
