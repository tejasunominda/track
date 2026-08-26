import { test, expect } from "@playwright/test";

test("knowledge base creates and searches", async ({ page }) => {
  await page.goto("/knowledge-base");
  await expect(page.getByRole("heading", { name: "Knowledge base" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New article" }).click();
  await page.getByPlaceholder("Article title").fill("Onboarding");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Article created")).toBeVisible({ timeout: 5000 });
  await page.getByPlaceholder("Search articles…").fill("Onboarding");
  await expect(page.getByText("Onboarding").first()).toBeVisible();
});

test("teams page creates", async ({ page }) => {
  await page.goto("/teams");
  await expect(page.getByRole("heading", { name: "Teams" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New team" }).click();
  await page.getByPlaceholder("Team name").fill("QA");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Team created")).toBeVisible({ timeout: 5000 });
});

test("assets page creates", async ({ page }) => {
  await page.goto("/assets");
  await expect(page.getByRole("heading", { name: "Assets" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New asset" }).click();
  await page.getByPlaceholder("Asset name").fill("Hero image");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Asset uploaded")).toBeVisible({ timeout: 5000 });
});

test("contracts page creates and signs", async ({ page }) => {
  await page.goto("/contracts");
  await expect(page.getByRole("heading", { name: "Contracts" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New contract" }).click();
  await page.getByPlaceholder("Contract name").fill("NDA");
  await page.getByPlaceholder("Parties").fill("Vendor");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Contract created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Sign" }).last().click();
  await expect(page.getByText("Contract signed")).toBeVisible({ timeout: 5000 });
});

test("vendors page creates", async ({ page }) => {
  await page.goto("/vendors");
  await expect(page.getByRole("heading", { name: "Vendors" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New vendor" }).click();
  await page.getByPlaceholder("Vendor name").fill("Legal Co");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Vendor created")).toBeVisible({ timeout: 5000 });
});
