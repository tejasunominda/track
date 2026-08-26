import { test, expect } from "@playwright/test";

test("loads sla policies page", async ({ page }) => {
  await page.goto("/s-l-a");
  await expect(page.getByRole("heading", { name: "SLA policies" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Premium")).toBeVisible();
});
