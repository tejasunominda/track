import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: enhanced ops pages", () => {
  test("meeting notes - cards with attendees and actions", async ({ page }) => {
    await page.goto(`${BASE}/meeting-notes`);
    await expect(page.getByRole("heading", { name: "Meeting notes" })).toBeVisible();
    await expect(page.getByText("Retro notes", { exact: true })).toBeVisible();
  });

  test("on-call - schedule with status badges", async ({ page }) => {
    await page.goto(`${BASE}/on-call`);
    await expect(page.getByRole("heading", { name: "On-call" })).toBeVisible();
    await expect(page.getByText("Alice").first()).toBeVisible();
  });

  test("org chart - tree with levels", async ({ page }) => {
    await page.goto(`${BASE}/org-chart`);
    await expect(page.getByRole("heading", { name: "Org chart" })).toBeVisible();
    await expect(page.getByText("CEO", { exact: true })).toBeVisible();
  });

  test("procedures - status cards with steps", async ({ page }) => {
    await page.goto(`${BASE}/procedures`);
    await expect(page.getByRole("heading", { name: "Procedures" })).toBeVisible();
    await expect(page.getByText("Incident response")).toBeVisible();
  });

  test("release notes - timeline with type badges", async ({ page }) => {
    await page.goto(`${BASE}/release-notes`);
    await expect(page.getByRole("heading", { name: "Release notes" })).toBeVisible();
    await expect(page.getByText("Version notes", { exact: true })).toBeVisible();
  });

  test("software - license bars with capacity", async ({ page }) => {
    await page.goto(`${BASE}/software`);
    await expect(page.getByRole("heading", { name: "Software" })).toBeVisible();
    await expect(page.getByText("License", { exact: true })).toBeVisible();
  });

  test("standups - daily updates with blockers", async ({ page }) => {
    await page.goto(`${BASE}/standups`);
    await expect(page.getByRole("heading", { name: "Standups" })).toBeVisible();
    await expect(page.getByText("Working on API")).toBeVisible();
  });

  test("budgets - progress bars with remaining", async ({ page }) => {
    await page.goto(`${BASE}/budgets`);
    await expect(page.getByRole("heading", { name: "Budgets" })).toBeVisible();
    await expect(page.getByText("Q1 budget", { exact: true })).toBeVisible();
  });

  test("contacts - role filter and avatars", async ({ page }) => {
    await page.goto(`${BASE}/contacts`);
    await expect(page.getByRole("heading", { name: "Contacts" })).toBeVisible();
    await expect(page.getByText("John Doe", { exact: true })).toBeVisible();
  });

  test("custom fields - type stats and cards", async ({ page }) => {
    await page.goto(`${BASE}/custom-fields`);
    await expect(page.getByRole("heading", { name: "Custom fields" })).toBeVisible();
    await expect(page.getByText("Severity")).toBeVisible();
  });
});
