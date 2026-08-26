import { test, expect } from "@playwright/test";

test("loads capa page", async ({ page }) => {
  await page.goto("/capa");
  await expect(page.getByRole("heading", { name: "CAPA" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Corrective action A")).toBeVisible();
});
