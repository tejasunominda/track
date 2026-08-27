import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced config pages", () => {
  test("career path - timeline with levels", async ({ page }) => {
    await page.goto(`${BASE}/career-path`);
    await expect(page.getByRole("heading", { name: "Career path" })).toBeVisible();
    await expect(page.getByText("Senior", { exact: true }).first()).toBeVisible();
  });

  test("approvals - stats and approve", async ({ page }) => {
    await page.goto(`${BASE}/approvals`);
    await expect(page.getByRole("heading", { name: "Approvals" })).toBeVisible();
    await expect(page.getByText("Q2 budget request")).toBeVisible();
  });

  test("assets - grid with type filter", async ({ page }) => {
    await page.goto(`${BASE}/assets`);
    await expect(page.getByRole("heading", { name: "Assets" })).toBeVisible();
    await expect(page.getByText("Logo", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Design" }).click();
  });

  test("feature flags - toggle and filter", async ({ page }) => {
    await page.goto(`${BASE}/feature-flags`);
    await expect(page.getByRole("heading", { name: "Feature flags" })).toBeVisible();
    await expect(page.getByText("Enabled", { exact: true })).toBeVisible();
  });

  test("change log - timeline with types", async ({ page }) => {
    await page.goto(`${BASE}/change-log`);
    await expect(page.getByRole("heading", { name: "Change log" })).toBeVisible();
    await expect(page.getByText("v2.0 changes", { exact: true })).toBeVisible();
  });

  test("cost centers - budget bars", async ({ page }) => {
    await page.goto(`${BASE}/cost-centers`);
    await expect(page.getByRole("heading", { name: "Cost centers" })).toBeVisible();
    await expect(page.getByText("Engineering", { exact: true })).toBeVisible();
  });

  test("files - grid and list views", async ({ page }) => {
    await page.goto(`${BASE}/files`);
    await expect(page.getByRole("heading", { name: "Files" })).toBeVisible();
    await expect(page.getByText("specs.pdf")).toBeVisible();
    await page.getByRole("button", { name: "List" }).click();
  });

  test("issue types - colored cards", async ({ page }) => {
    await page.goto(`${BASE}/issue-types`);
    await expect(page.getByRole("heading", { name: "Issue types" })).toBeVisible();
    await expect(page.getByText("Story", { exact: true })).toBeVisible();
  });

  test("job descriptions - department cards", async ({ page }) => {
    await page.goto(`${BASE}/job-descriptions`);
    await expect(page.getByRole("heading", { name: "Job descriptions" })).toBeVisible();
    await expect(page.getByText("Engineer", { exact: true })).toBeVisible();
  });

  test("labels - color picker and search", async ({ page }) => {
    await page.goto(`${BASE}/labels`);
    await expect(page.getByRole("heading", { name: "Labels" })).toBeVisible();
    await expect(page.getByText("bug").first()).toBeVisible();
  });
});
