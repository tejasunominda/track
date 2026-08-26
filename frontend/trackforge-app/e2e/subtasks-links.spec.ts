import { test, expect } from "@playwright/test";

test("creates a sub-task and links an issue", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByRole("heading", { name: "Implement user authentication" })).toBeVisible({ timeout: 15000 });

  await page.getByPlaceholder("Add a sub-task…").fill("Sub-task test");
  await page.getByRole("button", { name: "Add" }).first().click();
  await expect(page.getByText("Sub-task created", { exact: true })).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Sub-task test", { exact: true })).toBeVisible();

  await page.getByPlaceholder("Issue ID (e.g. i-2)").fill("i-2");
  await page.getByRole("button", { name: "Link" }).click();
  await expect(page.getByText("Issue linked", { exact: true })).toBeVisible({ timeout: 5000 });
});
