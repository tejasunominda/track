import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced enterprise pages", () => {
  test("hardware - status cards with filter", async ({ page }) => {
    await page.goto(`${BASE}/hardware`);
    await expect(page.getByRole("heading", { name: "Hardware" })).toBeVisible();
    await expect(page.getByText("MacBook", { exact: true })).toBeVisible();
  });

  test("risk register - severity cards with stats", async ({ page }) => {
    await page.goto(`${BASE}/risk-register`);
    await expect(page.getByRole("heading", { name: "Risk register" })).toBeVisible();
    await expect(page.getByText("High risk", { exact: true })).toBeVisible();
  });

  test("environments - health cards with toggle", async ({ page }) => {
    await page.goto(`${BASE}/environments`);
    await expect(page.getByRole("heading", { name: "Environments" })).toBeVisible();
    await expect(page.getByText("Production", { exact: true })).toBeVisible();
  });

  test("portfolio - stats and progress bars", async ({ page }) => {
    await page.goto(`${BASE}/portfolio`);
    await expect(page.getByRole("heading", { name: "Portfolio" })).toBeVisible();
    await expect(page.getByText("Engineering")).toBeVisible();
  });

  test("service desk - priority and status filter", async ({ page }) => {
    await page.goto(`${BASE}/service-desk`);
    await expect(page.getByRole("heading", { name: "Service desk" })).toBeVisible();
  });

  test("bill of materials - grouped by product", async ({ page }) => {
    await page.goto(`${BASE}/bill-of-materials`);
    await expect(page.getByRole("heading", { name: "Bill of materials" })).toBeVisible();
    await expect(page.getByText("Widget")).toBeVisible();
  });

  test("calendar - timeline with type badges", async ({ page }) => {
    await page.goto(`${BASE}/calendar`);
    await expect(page.getByRole("heading", { name: "Calendar" })).toBeVisible();
    await expect(page.getByText("Sprint planning")).toBeVisible();
  });

  test("epics - progress bars with status", async ({ page }) => {
    await page.goto(`${BASE}/epics`);
    await expect(page.getByRole("heading", { name: "Epics" })).toBeVisible();
    await expect(page.getByText("Platform")).toBeVisible();
  });

  test("move - stats and search", async ({ page }) => {
    await page.goto(`${BASE}/move`);
    await expect(page.getByRole("heading", { name: "Move" })).toBeVisible();
    await expect(page.getByText("ENG-5")).toBeVisible();
  });

  test("releases - status timeline", async ({ page }) => {
    await page.goto(`${BASE}/releases`);
    await expect(page.getByRole("heading", { name: "Releases" })).toBeVisible();
    await expect(page.getByText("v1.0.0")).toBeVisible();
  });
});
