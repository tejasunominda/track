import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: content & ops", () => {
  test("wiki - create and edit page", async ({ page }) => {
    await page.goto(`${BASE}/wiki`);
    await expect(page.getByRole("heading", { name: "Wiki" })).toBeVisible();
    await page.getByRole("button", { name: /New page/ }).click();
    await page.getByPlaceholder("Page title").fill("E2E Wiki Page");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Wiki Page")).toBeVisible();
  });

  test("email templates - create", async ({ page }) => {
    await page.goto(`${BASE}/email-templates`);
    await expect(page.getByRole("heading", { name: "Email templates" })).toBeVisible();
    await page.getByRole("button", { name: /New template/ }).click();
    await page.getByPlaceholder("Template name").fill("E2E Template");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Template")).toBeVisible();
  });

  test("macros - create and run", async ({ page }) => {
    await page.goto(`${BASE}/macros`);
    await expect(page.getByRole("heading", { name: "Macros" })).toBeVisible();
    await page.getByRole("button", { name: /New macro/ }).click();
    await page.getByPlaceholder("Macro name").fill("E2E Macro");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Macro")).toBeVisible();
  });

  test("runbooks - create", async ({ page }) => {
    await page.goto(`${BASE}/runbooks`);
    await expect(page.getByRole("heading", { name: "Runbooks" })).toBeVisible();
    await page.getByRole("button", { name: /New runbook/ }).click();
    await page.getByPlaceholder("Runbook name").fill("E2E Runbook");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Runbook")).toBeVisible();
  });

  test("service catalog - create", async ({ page }) => {
    await page.goto(`${BASE}/service-catalog`);
    await expect(page.getByRole("heading", { name: "Service catalog" })).toBeVisible();
    await page.getByRole("button", { name: /New service/ }).click();
    await page.getByPlaceholder("Service name").fill("E2E Service");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Service")).toBeVisible();
  });

  test("a/b tests - create", async ({ page }) => {
    await page.goto(`${BASE}/a-b-tests`);
    await expect(page.getByRole("heading", { name: "A/B tests" })).toBeVisible();
    await page.getByRole("button", { name: /New experiment/ }).click();
    await page.getByPlaceholder("Experiment name").fill("E2E Experiment");
    await page.getByPlaceholder("Variant A").fill("Control");
    await page.getByPlaceholder("Variant B").fill("Treatment");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Experiment")).toBeVisible();
  });

  test("resource planning - create", async ({ page }) => {
    await page.goto(`${BASE}/resource-planning`);
    await expect(page.getByRole("heading", { name: "Resource planning" })).toBeVisible();
    await page.getByRole("button", { name: /New allocation/ }).click();
    await page.getByPlaceholder("Person name").fill("E2E Person");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Person")).toBeVisible();
  });

  test("quick filters - create", async ({ page }) => {
    await page.goto(`${BASE}/quick-filters`);
    await expect(page.getByRole("heading", { name: "Quick filters" })).toBeVisible();
    await page.getByRole("button", { name: /New filter/ }).click();
    await page.getByPlaceholder("Filter name").fill("E2E Filter");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Filter")).toBeVisible();
  });

  test("color schemes - create", async ({ page }) => {
    await page.goto(`${BASE}/color-schemes`);
    await expect(page.getByRole("heading", { name: "Color schemes" })).toBeVisible();
    await page.getByRole("button", { name: /New scheme/ }).click();
    await page.getByPlaceholder("Scheme name").fill("E2E Scheme");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Scheme")).toBeVisible();
  });

  test("bookmarks - create", async ({ page }) => {
    await page.goto(`${BASE}/bookmarks`);
    await expect(page.getByRole("heading", { name: "Bookmarks" })).toBeVisible();
    await page.getByRole("button", { name: /New bookmark/ }).click();
    await page.getByPlaceholder("Title").fill("E2E Bookmark");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Bookmark")).toBeVisible();
  });
});
