import { test, expect } from "@playwright/test";

test("loads invitations page", async ({ page }) => {
  await page.goto("/invitations");
  await expect(page.getByRole("heading", { name: "Invitations" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Pending invite", { exact: true })).toBeVisible();
});
