import { test, expect } from "@playwright/test";

test("loads audit log page", async ({ page }) => {
  await page.goto("/admin/audit-log");
  await expect(page.getByRole("heading", { name: "Audit log" })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Download full log")).toBeVisible();
});
