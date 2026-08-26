import { test, expect } from "@playwright/test";

test("opportunities page creates", async ({ page }) => {
  await page.goto("/opportunities");
  await expect(page.getByRole("heading", { name: "Opportunities" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Opportunity name").fill("Upsell");
  await page.getByPlaceholder("Value").first().fill("90000");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Opportunity created")).toBeVisible({ timeout: 5000 });
});

test("deals page creates", async ({ page }) => {
  await page.goto("/deals");
  await expect(page.getByRole("heading", { name: "Deals" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Deal name").fill("SMB bundle");
  await page.getByPlaceholder("Value").first().fill("5000");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Deal created")).toBeVisible({ timeout: 5000 });
});

test("quotes page creates and sends", async ({ page }) => {
  await page.goto("/quotes");
  await expect(page.getByRole("heading", { name: "Quotes" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New quote" }).click();
  await page.getByPlaceholder("Quote title").fill("Quote 125");
  await page.getByPlaceholder("Amount").first().fill("8000");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Quote created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Send" }).last().click();
  await expect(page.getByText("Quote sent")).toBeVisible({ timeout: 5000 });
});

test("orders page creates and ships", async ({ page }) => {
  await page.goto("/orders");
  await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New order" }).click();
  await page.getByPlaceholder("Order name").fill("Order 999");
  await page.getByPlaceholder("Total").first().fill("600");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Order created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Ship" }).last().click();
  await expect(page.getByText("Order shipped")).toBeVisible({ timeout: 5000 });
});

test("invoices page creates and pays", async ({ page }) => {
  await page.goto("/invoices-received");
  await expect(page.getByRole("heading", { name: "Invoices received" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New invoice" }).click();
  await page.getByPlaceholder("Vendor").fill("Cloud Co");
  await page.getByPlaceholder("Amount").first().fill("300");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Invoice received")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Pay" }).last().click();
  await expect(page.getByText("Invoice paid")).toBeVisible({ timeout: 5000 });
});
