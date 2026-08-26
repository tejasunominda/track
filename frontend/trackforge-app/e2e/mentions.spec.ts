import { test, expect } from "@playwright/test";

test("loads mentions page", async ({ page }) => {
  await page.goto("/mentions");
  await expect(page.getByRole("heading", { name: "Mentions" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("@alice", { exact: true })).toBeVisible();
});
