import { test, expect } from "@playwright/test";

test("certifications page renews", async ({ page }) => {
  await page.goto("/certifications");
  await expect(page.getByRole("heading", { name: "Certifications" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Certification name").fill("Kubernetes");
  await page.getByPlaceholder("Holder").fill("Charlie");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Certification added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Renew" }).last().click();
  await expect(page.getByText("Certification renewed")).toBeVisible({ timeout: 5000 });
});

test("capa page closes", async ({ page }) => {
  await page.goto("/capa");
  await expect(page.getByRole("heading", { name: "CAPA" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("CAPA title").fill("Root cause");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("CAPA created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Close" }).last().click();
  await expect(page.getByText("CAPA closed")).toBeVisible({ timeout: 5000 });
});

test("non-conformances page closes", async ({ page }) => {
  await page.goto("/non-conformances");
  await expect(page.getByRole("heading", { name: "Non-conformances" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("NC name").fill("NC-99");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Non-conformance created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Close" }).last().click();
  await expect(page.getByText("Non-conformance closed")).toBeVisible({ timeout: 5000 });
});

test("defects page fixes", async ({ page }) => {
  await page.goto("/defects");
  await expect(page.getByRole("heading", { name: "Defects" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Defect name").fill("Graph flicker");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Defect created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Fix" }).last().click();
  await expect(page.getByText("Defect fixed")).toBeVisible({ timeout: 5000 });
});

test("inspections page passes", async ({ page }) => {
  await page.goto("/inspections");
  await expect(page.getByRole("heading", { name: "Inspections" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Inspection name").fill("Line check");
  await page.getByPlaceholder("Inspector").fill("Dave");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Inspection created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Pass" }).last().click();
  await expect(page.getByText("Inspection passed")).toBeVisible({ timeout: 5000 });
});
