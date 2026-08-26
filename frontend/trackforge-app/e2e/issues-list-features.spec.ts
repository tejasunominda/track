import { test, expect } from "@playwright/test";

test("filters, selects, changes status, and exports issues", async ({ page }) => {
  await page.goto("/projects/p-1/issues");
  await expect(page.getByText("Implement user authentication")).toBeVisible({ timeout: 15000 });

  await page.getByPlaceholder("Search this list…").fill("favicon");
  await expect(page.getByText("Fix missing favicon")).toBeVisible();
  await expect(page.getByText("Implement user authentication")).not.toBeVisible();

  await page.getByPlaceholder("Search this list…").fill("");
  await page.locator("select", { hasText: "All" }).first().selectOption("Done");
  await expect(page.getByText("Implement user authentication")).not.toBeVisible();

  await page.locator("select", { hasText: "Done" }).first().selectOption("All");
  await expect(page.getByText("Implement user authentication")).toBeVisible();

  const rows = page.locator('input[type="checkbox"]');
  await rows.nth(1).check();
  await expect(page.getByText(/selected/)).toBeVisible();

  await page.locator('select').nth(1).selectOption("Done");
  await expect(page.getByText("Status updated")).toBeVisible({ timeout: 5000 });

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Export" }).click(),
  ]);
  await expect(download.suggestedFilename()).toContain(".csv");
});
