import { test, expect } from "@playwright/test";

test("incidents page creates and resolves", async ({ page }) => {
  await page.goto("/incidents");
  await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New incident" }).click();
  await page.getByPlaceholder("Incident title").fill("DB lag");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Incident created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Resolve" }).last().click();
  await expect(page.getByText("Incident resolved")).toBeVisible({ timeout: 5000 });
});

test("in-app messages page toggles", async ({ page }) => {
  await page.goto("/in-app-messages");
  await expect(page.getByRole("heading", { name: "In-app messages" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Title").first().fill("Tip");
  await page.getByPlaceholder("Body").first().fill("Use filters");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Message created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Inactive" }).last().click();
  await expect(page.getByText("Message updated")).toBeVisible({ timeout: 5000 });
});

test("goals page creates", async ({ page }) => {
  await page.goto("/goals");
  await expect(page.getByRole("heading", { name: "Goals" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New goal" }).click();
  await page.getByPlaceholder("Goal name").fill("MRR 1M");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Goal created")).toBeVisible({ timeout: 5000 });
});

test("metrics page creates", async ({ page }) => {
  await page.goto("/metrics");
  await expect(page.getByRole("heading", { name: "Metrics" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New metric" }).click();
  await page.getByPlaceholder("Metric name").fill("Uptime");
  await page.getByPlaceholder("Value").first().fill("99");
  await page.getByPlaceholder("Unit").fill("%");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Metric added")).toBeVisible({ timeout: 5000 });
});

test("activity page loads", async ({ page }) => {
  await page.goto("/activity");
  await expect(page.getByRole("heading", { name: "Activity" })).toBeVisible({ timeout: 15000 });
  await expect(page.getByText("Alice").first()).toBeVisible();
});
