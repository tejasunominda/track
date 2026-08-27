import { test, expect } from "@playwright/test";
test("loads request types page", async ({ page }) => {
  await page.goto("/request-types");
  await expect(page.getByRole("heading", { name: "Request types" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Report a bug")).toBeVisible();
});
