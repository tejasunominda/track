import { test, expect } from "@playwright/test";

test("loads meeting notes page", async ({ page }) => {
  await page.goto("/meeting-notes");
  await expect(page.getByRole("heading", { name: "Meeting notes" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Retro notes", { exact: true })).toBeVisible();
});
