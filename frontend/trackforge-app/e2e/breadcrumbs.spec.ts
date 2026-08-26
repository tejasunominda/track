import { test, expect } from "@playwright/test";

test("shows breadcrumb trail for project issues", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  const nav = page.getByRole("navigation").first();
  await expect(nav.getByText("Projects")).toBeVisible();
  await expect(nav.getByText("Engineering")).toBeVisible();
  await expect(nav.getByText("Issues")).toBeVisible();
});
