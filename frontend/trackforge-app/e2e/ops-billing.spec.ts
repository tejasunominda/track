import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: ops & billing", () => {
  test("queues - filter and assign", async ({ page }) => {
    await page.goto(`${BASE}/queues`);
    await expect(page.getByRole("heading", { name: "Queues" })).toBeVisible();
    await expect(page.getByText("Q-1")).toBeVisible();
  });

  test("rule engine - create", async ({ page }) => {
    await page.goto(`${BASE}/rule-engine`);
    await expect(page.getByRole("heading", { name: "Rule engine" })).toBeVisible();
    await page.getByRole("button", { name: /New rule/ }).click();
    await page.getByPlaceholder("Rule name").fill("E2E Rule");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Rule")).toBeVisible();
  });

  test("migrate - create", async ({ page }) => {
    await page.goto(`${BASE}/migrate`);
    await expect(page.getByRole("heading", { name: "Migrate" })).toBeVisible();
    await page.getByRole("button", { name: /New migration/ }).click();
    await page.getByPlaceholder("Job name").fill("E2E Migration");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Migration")).toBeVisible();
  });

  test("reports export - create", async ({ page }) => {
    await page.goto(`${BASE}/reports-export`);
    await expect(page.getByRole("heading", { name: "Reports export" })).toBeVisible();
    await page.getByRole("button", { name: /New export/ }).click();
    await page.getByPlaceholder("Export name").fill("E2E Export");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Export")).toBeVisible();
  });

  test("templates - create", async ({ page }) => {
    await page.goto(`${BASE}/templates`);
    await expect(page.getByRole("heading", { name: "Templates" })).toBeVisible();
    await page.getByRole("button", { name: /New template/ }).click();
    await page.getByPlaceholder("Template name").fill("E2E Template");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Template")).toBeVisible();
  });

  test("dependencies - create", async ({ page }) => {
    await page.goto(`${BASE}/dependencies`);
    await expect(page.getByRole("heading", { name: "Dependencies" })).toBeVisible();
    await page.getByRole("button", { name: /New dependency/ }).click();
    await page.getByPlaceholder("From (e.g. ENG-1)").fill("E2E-1");
    await page.getByPlaceholder("To (e.g. ENG-2)").fill("E2E-2");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E-1")).toBeVisible();
  });

  test("timeline - create", async ({ page }) => {
    await page.goto(`${BASE}/timeline`);
    await expect(page.getByRole("heading", { name: "Timeline" })).toBeVisible();
    await page.getByRole("button", { name: /New task/ }).click();
    await page.getByPlaceholder("Task name").fill("E2E Task");
    await page.locator("form").getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Task")).toBeVisible();
  });

  test("forms - create", async ({ page }) => {
    await page.goto(`${BASE}/forms`);
    await expect(page.getByRole("heading", { name: "Forms" })).toBeVisible();
    await page.getByRole("button", { name: /New form/ }).click();
    await page.getByPlaceholder("Form name").fill("E2E Form");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Form")).toBeVisible();
  });

  test("components - create", async ({ page }) => {
    await page.goto(`${BASE}/components`);
    await expect(page.getByRole("heading", { name: "Components" })).toBeVisible();
    await page.getByRole("button", { name: /New component/ }).click();
    await page.getByPlaceholder("Component name").fill("E2E Component");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Component")).toBeVisible();
  });

  test("invoices - create", async ({ page }) => {
    await page.goto(`${BASE}/invoices`);
    await expect(page.getByRole("heading", { name: "Invoices" })).toBeVisible();
    await page.getByRole("button", { name: /New invoice/ }).click();
    await page.getByPlaceholder("Customer name").fill("E2E Customer");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Customer")).toBeVisible();
  });
});
