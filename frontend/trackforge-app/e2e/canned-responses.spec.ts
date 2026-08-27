import { test, expect } from "@playwright/test";
test("loads canned responses page", async ({ page }) => {
  await page.goto("/canned-responses");
  await expect(page.getByRole("heading", { name: "Canned responses" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Greeting")).toBeVisible();
});
