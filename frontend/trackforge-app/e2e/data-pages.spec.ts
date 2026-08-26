import { test, expect } from "@playwright/test";

test("import page preview", async ({ page }) => {
  await page.goto("/import");
  await expect(page.getByRole("heading", { name: "Import" })).toBeVisible({ timeout: 15000 });
  await page.getByText("Click to upload a CSV file").click();
  await page.setInputFiles('input[type="file"]', {
    name: "sample.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("summary,status\nIssue A,To Do\nIssue B,Done\n"),
  });
  await expect(page.getByText(/Preview \(4 lines\)/)).toBeVisible({ timeout: 10000 });
});

test("export page", async ({ page }) => {
  await page.goto("/export");
  await expect(page.getByRole("heading", { name: "Export" })).toBeVisible({ timeout: 15000 });
  await page.getByText("JSON").click();
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Export as JSON" }).click()]);
  await expect(download.suggestedFilename()).toMatch(/\.(csv|json)$/);
});

test("archive page lists done issues", async ({ page }) => {
  await page.goto("/archive");
  await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible({ timeout: 15000 });
});

test("epics page creates epic", async ({ page }) => {
  await page.goto("/epics");
  await expect(page.getByRole("heading", { name: "Epics" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New epic" }).click();
  await page.getByPlaceholder("Epic name").fill("Mobile app");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Epic created")).toBeVisible({ timeout: 5000 });
});

test("roadmap page adds goal", async ({ page }) => {
  await page.goto("/roadmap");
  await expect(page.getByRole("heading", { name: "Roadmap" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Add goal" }).click();
  await page.getByPlaceholder("Goal name").fill("API v2");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Roadmap goal added")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("API v2")).toBeVisible();
});
