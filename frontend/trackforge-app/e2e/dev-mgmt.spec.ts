import { test, expect } from "@playwright/test";

test("feature flags page toggles", async ({ page }) => {
  await page.goto("/feature-flags");
  await expect(page.getByRole("heading", { name: "Feature flags" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Flag name").fill("Beta");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Flag added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "OFF" }).last().click();
  await expect(page.getByText("Flag toggled")).toBeVisible({ timeout: 5000 });
});

test("release notes page creates", async ({ page }) => {
  await page.goto("/release-notes");
  await expect(page.getByRole("heading", { name: "Release notes" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Version").first().fill("2.5.0");
  await page.getByPlaceholder("Notes").first().fill("Improvements");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Release note added")).toBeVisible({ timeout: 5000 });
});

test("change log page creates", async ({ page }) => {
  await page.goto("/change-log");
  await expect(page.getByRole("heading", { name: "Change log" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Version").first().fill("v3");
  await page.getByPlaceholder("Change").first().fill("Auth");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Change added")).toBeVisible({ timeout: 5000 });
});

test("risk register page creates", async ({ page }) => {
  await page.goto("/risk-register");
  await expect(page.getByRole("heading", { name: "Risk register" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New risk" }).click();
  await page.getByPlaceholder("Risk name").fill("Latency");
  await page.locator("select").last().selectOption("High");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Risk added")).toBeVisible({ timeout: 5000 });
});

test("postmortems page publishes", async ({ page }) => {
  await page.goto("/postmortems");
  await expect(page.getByRole("heading", { name: "Postmortems" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Postmortem").first().fill("DB outage");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Postmortem created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Publish" }).last().click();
  await expect(page.getByText("Postmortem published")).toBeVisible({ timeout: 5000 });
});
