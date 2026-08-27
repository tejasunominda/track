import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced sales/quality pages", () => {
  test("test runs - status cards with start", async ({ page }) => {
    await page.goto(`${BASE}/test-runs`);
    await expect(page.getByRole("heading", { name: "Test runs" })).toBeVisible();
    await expect(page.getByText("Run #42", { exact: true })).toBeVisible();
  });

  test("work instructions - status cards with approve", async ({ page }) => {
    await page.goto(`${BASE}/work-instructions`);
    await expect(page.getByRole("heading", { name: "Work instructions" })).toBeVisible();
    await expect(page.getByText("Step 1", { exact: true })).toBeVisible();
  });

  test("deals - value cards with stage badges", async ({ page }) => {
    await page.goto(`${BASE}/deals`);
    await expect(page.getByRole("heading", { name: "Deals" })).toBeVisible();
    await expect(page.getByText("Enterprise renewal")).toBeVisible();
  });

  test("inventory - quantity cards with low stock", async ({ page }) => {
    await page.goto(`${BASE}/inventory`);
    await expect(page.getByRole("heading", { name: "Inventory" })).toBeVisible();
    await expect(page.getByText("Laptop", { exact: true })).toBeVisible();
  });

  test("knowledge base - category cards with views", async ({ page }) => {
    await page.goto(`${BASE}/knowledge-base`);
    await expect(page.getByRole("heading", { name: "Knowledge base" })).toBeVisible();
    await expect(page.getByText("Getting started")).toBeVisible();
  });

  test("opportunities - stage pipeline with value", async ({ page }) => {
    await page.goto(`${BASE}/opportunities`);
    await expect(page.getByRole("heading", { name: "Opportunities" })).toBeVisible();
    await expect(page.getByText("Expansion", { exact: true })).toBeVisible();
  });

  test("vendors - category cards with contact", async ({ page }) => {
    await page.goto(`${BASE}/vendors`);
    await expect(page.getByRole("heading", { name: "Vendors" })).toBeVisible();
    await expect(page.getByText("Acme Hosting")).toBeVisible();
  });

  test("compliance - status cards with pass", async ({ page }) => {
    await page.goto(`${BASE}/compliance`);
    await expect(page.getByRole("heading", { name: "Compliance" })).toBeVisible();
    await expect(page.getByText("GDPR", { exact: true })).toBeVisible();
  });

  test("non-conformances - severity cards with close", async ({ page }) => {
    await page.goto(`${BASE}/non-conformances`);
    await expect(page.getByRole("heading", { name: "Non-conformances" })).toBeVisible();
    await expect(page.getByText("NC-22", { exact: true })).toBeVisible();
  });

  test("defects - severity cards with fix", async ({ page }) => {
    await page.goto(`${BASE}/defects`);
    await expect(page.getByRole("heading", { name: "Defects" })).toBeVisible();
    await expect(page.getByText("Minor", { exact: true })).toBeVisible();
  });
});
