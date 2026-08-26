import { test, expect } from "@playwright/test";

test("loads TrackForge and navigates to projects", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/TrackForge/);
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
});

test("login page renders", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByText("Log in to continue")).toBeVisible();
  await expect(page.getByPlaceholder("acme")).toBeVisible();
  await expect(page.getByRole("button", { name: /Continue/i })).toBeEnabled();
});
