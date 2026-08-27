import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: creative & final", () => {
  test("presentations - create slide", async ({ page }) => {
    await page.goto(`${BASE}/presentations`);
    await expect(page.getByRole("heading", { name: "Presentations" })).toBeVisible();
    await page.getByRole("button", { name: /New slide/ }).click();
    await page.getByPlaceholder("Slide title").fill("E2E Slide");
    await page.locator("form").getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Slide")).toBeVisible();
  });

  test("spreadsheets - create sheet", async ({ page }) => {
    await page.goto(`${BASE}/spreadsheets`);
    await expect(page.getByRole("heading", { name: "Spreadsheets" })).toBeVisible();
    await page.getByRole("button", { name: /New sheet/ }).click();
    await page.getByPlaceholder("Sheet name").fill("E2E Sheet");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Sheet")).toBeVisible();
  });

  test("whiteboard - add note", async ({ page }) => {
    await page.goto(`${BASE}/whiteboard`);
    await expect(page.getByRole("heading", { name: "Whiteboard" })).toBeVisible();
    await page.getByRole("button", { name: /New note/ }).click();
    await page.getByPlaceholder("Note text").fill("E2E Note");
    await page.locator("form").getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E Note")).toBeVisible();
  });

  test("mind map - view tree", async ({ page }) => {
    await page.goto(`${BASE}/mind-map`);
    await expect(page.getByRole("heading", { name: "Mind map" })).toBeVisible();
    await expect(page.getByText("TrackForge")).toBeVisible();
  });

  test("drawings - add shape", async ({ page }) => {
    await page.goto(`${BASE}/drawings`);
    await expect(page.getByRole("heading", { name: "Drawings" })).toBeVisible();
    await page.getByRole("button", { name: /Add shape/ }).click();
    await expect(page.getByText("4 shapes on canvas")).toBeVisible();
  });

  test("images - upload", async ({ page }) => {
    await page.goto(`${BASE}/images`);
    await expect(page.getByRole("heading", { name: "Images" })).toBeVisible();
    await page.getByRole("button", { name: /Upload/ }).click();
    await page.getByPlaceholder("Image filename (e.g. screenshot.png)").fill("e2e-test.png");
    await page.locator("form").getByRole("button", { name: "Upload" }).click();
    await expect(page.getByText("e2e-test.png")).toBeVisible();
  });

  test("copy - create", async ({ page }) => {
    await page.goto(`${BASE}/copy`);
    await expect(page.getByRole("heading", { name: "Copy" })).toBeVisible();
    await page.getByPlaceholder("Issue (e.g. ENG-1)").fill("E2E-1");
    await page.locator("form").getByRole("button", { name: "Copy" }).click();
    await expect(page.getByText("E2E-1")).toBeVisible();
  });

  test("move - create", async ({ page }) => {
    await page.goto(`${BASE}/move`);
    await expect(page.getByRole("heading", { name: "Move" })).toBeVisible();
    await page.getByPlaceholder("Issue (e.g. ENG-1)").fill("E2E-1");
    await page.locator("form").getByRole("button", { name: "Move" }).click();
    await expect(page.getByText("E2E-1")).toBeVisible();
  });

  test("trash - view items", async ({ page }) => {
    await page.goto(`${BASE}/trash`);
    await expect(page.getByRole("heading", { name: "Trash" })).toBeVisible();
    await expect(page.getByText("Old auth flow")).toBeVisible();
  });

  test("mentions - view feed", async ({ page }) => {
    await page.goto(`${BASE}/mentions`);
    await expect(page.getByRole("heading", { name: "Mentions" })).toBeVisible();
    await expect(page.getByText("Alice")).toBeVisible();
  });

  test("subscriptions - view plans", async ({ page }) => {
    await page.goto(`${BASE}/subscriptions`);
    await expect(page.getByRole("heading", { name: "Subscriptions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Professional" })).toBeVisible();
  });
});
