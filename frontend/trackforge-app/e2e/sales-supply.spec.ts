import { test, expect } from "@playwright/test";

test("leads page qualifies", async ({ page }) => {
  await page.goto("/leads");
  await expect(page.getByRole("heading", { name: "Leads" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New lead" }).click();
  await page.getByPlaceholder("Name").first().fill("Sam");
  await page.getByPlaceholder("Email").first().fill("sam@example.com");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Lead created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Qualify" }).last().click();
  await expect(page.getByText("Lead qualified")).toBeVisible({ timeout: 5000 });
});

test("inventory page creates", async ({ page }) => {
  await page.goto("/inventory");
  await expect(page.getByRole("heading", { name: "Inventory" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New item" }).click();
  await page.getByPlaceholder("Item name").fill("Keyboard");
  await page.getByPlaceholder("Quantity").first().fill("10");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Item added")).toBeVisible({ timeout: 5000 });
});

test("suppliers page creates", async ({ page }) => {
  await page.goto("/suppliers");
  await expect(page.getByRole("heading", { name: "Suppliers" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New supplier" }).click();
  await page.getByPlaceholder("Supplier name").fill("Parts Inc");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Supplier added")).toBeVisible({ timeout: 5000 });
});

test("cost centers page creates", async ({ page }) => {
  await page.goto("/cost-centers");
  await expect(page.getByRole("heading", { name: "Cost centers" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Name").first().fill("Sales");
  await page.getByPlaceholder("Budget").first().fill("200000");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Cost center added")).toBeVisible({ timeout: 5000 });
});

test("forecasts page creates", async ({ page }) => {
  await page.goto("/forecasts");
  await expect(page.getByRole("heading", { name: "Forecasts" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New forecast" }).click();
  await page.getByPlaceholder("Forecast name").fill("MRR");
  await page.getByPlaceholder("Value").first().fill("90000");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Forecast added")).toBeVisible({ timeout: 5000 });
});
