import { test, expect } from "@playwright/test";

test("loads service desk page", async ({ page }) => {
  await page.goto("/service-desk");
  await expect(page.getByRole("heading", { name: "Service desk" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Tickets")).toBeVisible();
});
