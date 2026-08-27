import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: issue ops", () => {
  test("quality - create test run", async ({ page }) => {
    await page.goto(`${BASE}/quality`);
    await expect(page.getByRole("heading", { name: "Quality" })).toBeVisible();
    await page.getByRole("button", { name: /New test run/ }).click();
    await page.getByPlaceholder("Test run name").fill("E2E Test Run");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Test Run")).toBeVisible();
  });

  test("drafts - create", async ({ page }) => {
    await page.goto(`${BASE}/drafts`);
    await expect(page.getByRole("heading", { name: "Drafts" })).toBeVisible();
    await page.getByRole("button", { name: /New draft/ }).click();
    await page.getByPlaceholder("Draft title").fill("E2E Draft");
    await page.locator("form").getByRole("button", { name: "Save draft" }).click();
    await expect(page.getByText("E2E Draft")).toBeVisible();
  });

  test("history - view changes", async ({ page }) => {
    await page.goto(`${BASE}/history`);
    await expect(page.getByRole("heading", { name: "History" })).toBeVisible();
    await expect(page.getByText("Alice").first()).toBeVisible();
  });

  test("clone - create", async ({ page }) => {
    await page.goto(`${BASE}/clone`);
    await expect(page.getByRole("heading", { name: "Clone" })).toBeVisible();
    await page.getByRole("button", { name: /Clone issue/ }).click();
    await page.getByPlaceholder("e.g. ENG-1").fill("E2E-1");
    await page.locator("form").getByRole("button", { name: "Clone now" }).click();
    await expect(page.getByText("E2E-1 (clone)")).toBeVisible();
  });

  test("link - create", async ({ page }) => {
    await page.goto(`${BASE}/link`);
    await expect(page.getByRole("heading", { name: "Links" })).toBeVisible();
    await page.getByRole("button", { name: /New link/ }).click();
    await page.getByPlaceholder("Issue (e.g. ENG-1)").fill("E2E-1");
    await page.getByPlaceholder("URL or issue key").fill("https://e2e.test");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E-1")).toBeVisible();
  });

  test("bulk edit - select and apply", async ({ page }) => {
    await page.goto(`${BASE}/bulk-edit`);
    await expect(page.getByRole("heading", { name: "Bulk edit" })).toBeVisible();
    await expect(page.getByText("ENG-1")).toBeVisible();
  });

  test("recycle bin - view and restore", async ({ page }) => {
    await page.goto(`${BASE}/recycle-bin`);
    await expect(page.getByRole("heading", { name: "Recycle bin" })).toBeVisible();
    await expect(page.getByText("ENG-10")).toBeVisible();
  });

  test("flags - create", async ({ page }) => {
    await page.goto(`${BASE}/flags`);
    await expect(page.getByRole("heading", { name: "Flags" })).toBeVisible();
    await page.getByRole("button", { name: /New flag/ }).click();
    await page.getByPlaceholder("Issue (e.g. ENG-1)").fill("E2E-1");
    await page.getByPlaceholder("Reason for flag").fill("E2E flag reason");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E flag reason")).toBeVisible();
  });

  test("votes - create and vote", async ({ page }) => {
    await page.goto(`${BASE}/votes`);
    await expect(page.getByRole("heading", { name: "Votes" })).toBeVisible();
    await page.getByRole("button", { name: /New vote item/ }).click();
    await page.getByPlaceholder("Issue (e.g. ENG-1)").fill("E2E-1");
    await page.getByPlaceholder("Feature title").fill("E2E Feature");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Feature")).toBeVisible();
  });

  test("watchers - create", async ({ page }) => {
    await page.goto(`${BASE}/watchers`);
    await expect(page.getByRole("heading", { name: "Watchers" })).toBeVisible();
    await page.getByRole("button", { name: /Watch issue/ }).click();
    await page.getByPlaceholder("Issue (e.g. ENG-1)").fill("E2E-1");
    await page.getByPlaceholder("Issue title").fill("E2E Issue");
    await page.locator("form").getByRole("button", { name: "Watch" }).click();
    await expect(page.getByText("E2E Issue")).toBeVisible();
  });
});
