import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: config & service desk", () => {
  test("notifications hub - channels and prefs", async ({ page }) => {
    await page.goto(`${BASE}/notifications-hub`);
    await expect(page.getByRole("heading", { name: "Notifications hub" })).toBeVisible();
    await expect(page.getByText("Team Slack")).toBeVisible();
  });

  test("screens - create", async ({ page }) => {
    await page.goto(`${BASE}/screens`);
    await expect(page.getByRole("heading", { name: "Screens" })).toBeVisible();
    await page.getByRole("button", { name: /New screen/ }).click();
    await page.getByPlaceholder("Screen name").fill("E2E Screen");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Screen")).toBeVisible();
  });

  test("field configs - add", async ({ page }) => {
    await page.goto(`${BASE}/field-configs`);
    await expect(page.getByRole("heading", { name: "Field configs" })).toBeVisible();
    await expect(page.getByText("Summary")).toBeVisible();
  });

  test("schemes - create", async ({ page }) => {
    await page.goto(`${BASE}/schemes`);
    await expect(page.getByRole("heading", { name: "Schemes" })).toBeVisible();
    await page.getByRole("button", { name: /New scheme/ }).click();
    await page.getByPlaceholder("Scheme name").fill("E2E Scheme");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Scheme")).toBeVisible();
  });

  test("dashboard builder - add widget", async ({ page }) => {
    await page.goto(`${BASE}/dashboard-builder`);
    await expect(page.getByRole("heading", { name: "Dashboard builder" })).toBeVisible();
    await page.getByRole("button", { name: /Add widget/ }).click();
    await page.getByPlaceholder("Widget title").fill("E2E Widget");
    await page.locator("form").getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Widget")).toBeVisible();
  });

  test("reports builder - create", async ({ page }) => {
    await page.goto(`${BASE}/reports-builder`);
    await expect(page.getByRole("heading", { name: "Reports builder" })).toBeVisible();
    await page.getByRole("button", { name: /New report/ }).click();
    await page.getByPlaceholder("Report name").fill("E2E Report");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Report")).toBeVisible();
  });

  test("surveys - create", async ({ page }) => {
    await page.goto(`${BASE}/surveys`);
    await expect(page.getByRole("heading", { name: "Surveys" })).toBeVisible();
    await page.getByRole("button", { name: /New survey/ }).click();
    await page.getByPlaceholder("Survey title").fill("E2E Survey");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Survey")).toBeVisible();
  });

  test("portal - create", async ({ page }) => {
    await page.goto(`${BASE}/portal`);
    await expect(page.getByRole("heading", { name: "Portal" })).toBeVisible();
    await expect(page.getByText("Customer Support")).toBeVisible();
  });

  test("request types - create", async ({ page }) => {
    await page.goto(`${BASE}/request-types`);
    await expect(page.getByRole("heading", { name: "Request types" })).toBeVisible();
    await page.getByRole("button", { name: /New request type/ }).click();
    await page.getByPlaceholder("Request type name").fill("E2E Request");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Request")).toBeVisible();
  });

  test("canned responses - create", async ({ page }) => {
    await page.goto(`${BASE}/canned-responses`);
    await expect(page.getByRole("heading", { name: "Canned responses" })).toBeVisible();
    await page.getByRole("button", { name: /New response/ }).click();
    await page.getByPlaceholder("Response name").fill("E2E Response");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Response")).toBeVisible();
  });
});
