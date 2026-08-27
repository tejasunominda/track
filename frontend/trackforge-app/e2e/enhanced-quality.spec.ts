import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced ops/quality pages", () => {
  test("copy - stats and search", async ({ page }) => {
    await page.goto(`${BASE}/copy`);
    await expect(page.getByRole("heading", { name: "Copy" })).toBeVisible();
    await expect(page.getByText("ENG-1")).toBeVisible();
  });

  test("capa - status cards with close", async ({ page }) => {
    await page.goto(`${BASE}/capa`);
    await expect(page.getByRole("heading", { name: "CAPA" })).toBeVisible();
    await expect(page.getByText("Corrective action A", { exact: true })).toBeVisible();
  });

  test("goals - progress bars with stats", async ({ page }) => {
    await page.goto(`${BASE}/goals`);
    await expect(page.getByRole("heading", { name: "Goals" })).toBeVisible();
    await expect(page.getByText("Q1 target", { exact: true })).toBeVisible();
  });

  test("manufacturing - status cards with start", async ({ page }) => {
    await page.goto(`${BASE}/manufacturing`);
    await expect(page.getByRole("heading", { name: "Manufacturing" })).toBeVisible();
    await expect(page.getByText("Assembly A")).toBeVisible();
  });

  test("offboarding - status cards with complete", async ({ page }) => {
    await page.goto(`${BASE}/offboarding`);
    await expect(page.getByRole("heading", { name: "Offboarding" })).toBeVisible();
    await expect(page.getByText("Exit", { exact: true })).toBeVisible();
  });

  test("policies - active toggle with version", async ({ page }) => {
    await page.goto(`${BASE}/policies`);
    await expect(page.getByRole("heading", { name: "Policies" })).toBeVisible();
    await expect(page.getByText("Policy A", { exact: true })).toBeVisible();
  });

  test("postmortems - status cards with publish", async ({ page }) => {
    await page.goto(`${BASE}/postmortems`);
    await expect(page.getByRole("heading", { name: "Postmortems" })).toBeVisible();
    await expect(page.getByText("Root cause", { exact: true })).toBeVisible();
  });

  test("retrospectives - category columns", async ({ page }) => {
    await page.goto(`${BASE}/retrospectives`);
    await expect(page.getByRole("heading", { name: "Retrospectives" })).toBeVisible();
    await expect(page.getByText("Sprint retro", { exact: true })).toBeVisible();
  });

  test("sla - policy cards with tier badges", async ({ page }) => {
    await page.goto(`${BASE}/s-l-a`);
    await expect(page.getByRole("heading", { name: "SLA policies" })).toBeVisible();
    await expect(page.getByText("Premium", { exact: true })).toBeVisible();
  });

  test("test cases - status cards with pass rate", async ({ page }) => {
    await page.goto(`${BASE}/test-cases`);
    await expect(page.getByRole("heading", { name: "Test cases" })).toBeVisible();
    await expect(page.getByText("Test case A", { exact: true })).toBeVisible();
  });
});
