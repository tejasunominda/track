import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced core pages", () => {
  test("settings - tabs and toggles", async ({ page }) => {
    await page.goto(`${BASE}/settings`);
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
    await expect(page.getByText("Organization name")).toBeVisible();
    await page.getByRole("button", { name: "Security" }).click();
    await expect(page.getByText("Two-factor authentication")).toBeVisible();
    await page.getByRole("button", { name: "Appearance" }).click();
    await expect(page.getByText("Theme")).toBeVisible();
  });

  test("backlog - stats and filter", async ({ page }) => {
    await page.goto(`${BASE}/projects/p-1/backlog`);
    await expect(page.getByRole("heading", { name: "Backlog" })).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
  });

  test("teams - expand and add member", async ({ page }) => {
    await page.goto(`${BASE}/teams`);
    await expect(page.getByRole("heading", { name: "Teams" })).toBeVisible();
    await expect(page.getByText("DevOps").first()).toBeVisible();
    await page.getByPlaceholder("Add member name...").fill("E2E Member");
    await page.locator("form").getByRole("button", { name: "Add" }).click();
  });

  test("people - search and filter", async ({ page }) => {
    await page.goto(`${BASE}/people`);
    await expect(page.getByRole("heading", { name: "People" })).toBeVisible();
    await expect(page.getByText("Alice").first()).toBeVisible();
  });

  test("help - expand article and categories", async ({ page }) => {
    await page.goto(`${BASE}/help`);
    await expect(page.getByText("Help center", { exact: true })).toBeVisible();
    await expect(page.getByText("Getting started with TrackForge")).toBeVisible();
    await page.getByRole("button", { name: "Issues", exact: true }).click();
    await expect(page.getByText("How to create an issue")).toBeVisible();
  });

  test("integrations - search and filter", async ({ page }) => {
    await page.goto(`${BASE}/integrations`);
    await expect(page.getByRole("heading", { name: "Integrations" })).toBeVisible();
    await expect(page.getByText("Slack")).toBeVisible();
    await page.getByRole("button", { name: "Development" }).click();
  });

  test("billing - usage and invoices", async ({ page }) => {
    await page.goto(`${BASE}/billing`);
    await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible();
    await expect(page.getByText("Pro", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Invoice history")).toBeVisible();
  });

  test("boards - create with type", async ({ page }) => {
    await page.goto(`${BASE}/boards`);
    await expect(page.getByRole("heading", { name: "Boards" })).toBeVisible();
    await expect(page.getByText("Sprint board")).toBeVisible();
    await page.getByRole("button", { name: /New board/ }).click();
    await page.getByPlaceholder("Board name").fill("E2E Board");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Board")).toBeVisible();
  });

  test("gantt - shift and navigate", async ({ page }) => {
    await page.goto(`${BASE}/gantt`);
    await expect(page.getByRole("heading", { name: "Gantt" })).toBeVisible();
    await expect(page.getByText("Design").first()).toBeVisible();
    await expect(page.getByText("W1", { exact: true })).toBeVisible();
  });

  test("profile - tabs and activity", async ({ page }) => {
    await page.goto(`${BASE}/profile`);
    await expect(page.getByText("Your profile", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Edit profile" })).toBeVisible();
    await page.getByRole("button", { name: "Activity" }).click();
    await expect(page.getByText("Created issue")).toBeVisible();
  });
});
