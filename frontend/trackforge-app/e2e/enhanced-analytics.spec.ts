import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced analytics pages", () => {
  test("search - run query and filter", async ({ page }) => {
    await page.goto(`${BASE}/search`);
    await expect(page.getByText("Search issues", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByText("ENG-1")).toBeVisible();
  });

  test("activity - filter by type", async ({ page }) => {
    await page.goto(`${BASE}/activity`);
    await expect(page.getByRole("heading", { name: "Activity" })).toBeVisible();
    await expect(page.getByText("Alice").first()).toBeVisible();
    await page.getByRole("button", { name: "created" }).click();
  });

  test("audit log - search and expand", async ({ page }) => {
    await page.goto(`${BASE}/admin/audit-log`);
    await expect(page.getByRole("heading", { name: "Audit log" })).toBeVisible();
    await expect(page.getByText("Download full log")).toBeVisible();
  });

  test("customers - create and filter", async ({ page }) => {
    await page.goto(`${BASE}/customers`);
    await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible();
    await expect(page.getByText("Acme Corp", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: /New customer/ }).click();
    await page.getByPlaceholder("Customer name").fill("E2E Customer");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Customer")).toBeVisible();
  });

  test("forecasts - create with period", async ({ page }) => {
    await page.goto(`${BASE}/forecasts`);
    await expect(page.getByRole("heading", { name: "Forecasts" })).toBeVisible();
    await expect(page.getByText("Revenue", { exact: true })).toBeVisible();
  });

  test("product requirements - create and advance", async ({ page }) => {
    await page.goto(`${BASE}/product-requirements`);
    await expect(page.getByRole("heading", { name: "Product requirements" })).toBeVisible();
    await expect(page.getByText("Auth PRD")).toBeVisible();
    await page.getByRole("button", { name: /New PRD/ }).click();
    await page.getByPlaceholder("PRD title").fill("E2E PRD");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E PRD")).toBeVisible();
  });

  test("suppliers - create and filter", async ({ page }) => {
    await page.goto(`${BASE}/suppliers`);
    await expect(page.getByRole("heading", { name: "Suppliers" })).toBeVisible();
    await expect(page.getByText("Supplier X", { exact: true })).toBeVisible();
  });

  test("test plans - create and run", async ({ page }) => {
    await page.goto(`${BASE}/test-plans`);
    await expect(page.getByRole("heading", { name: "Test plans" })).toBeVisible();
    await expect(page.getByText("Regression suite", { exact: true })).toBeVisible();
  });

  test("archive - search and filter", async ({ page }) => {
    await page.goto(`${BASE}/archive`);
    await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible();
    await expect(page.getByText("Restore").first()).toBeVisible();
  });

  test("metrics - create with threshold", async ({ page }) => {
    await page.goto(`${BASE}/metrics`);
    await expect(page.getByRole("heading", { name: "Metrics" })).toBeVisible();
    await expect(page.getByText("CPU usage", { exact: true })).toBeVisible();
  });
});
