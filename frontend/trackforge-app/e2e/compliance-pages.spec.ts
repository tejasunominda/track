import { test, expect } from "@playwright/test";

test("work instructions approves", async ({ page }) => {
  await page.goto("/work-instructions");
  await expect(page.getByRole("heading", { name: "Work instructions" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Instruction title").fill("Daily sync");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Work instruction created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Approve" }).last().click();
  await expect(page.getByText("Work instruction approved")).toBeVisible({ timeout: 5000 });
});

test("procedures page creates", async ({ page }) => {
  await page.goto("/procedures");
  await expect(page.getByRole("heading", { name: "Procedures" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Procedure title").fill("On-call");
  await page.getByPlaceholder("Owner").fill("SRE");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Procedure created")).toBeVisible({ timeout: 5000 });
});

test("policies page creates and toggles", async ({ page }) => {
  await page.goto("/policies");
  await expect(page.getByRole("heading", { name: "Policies" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Policy title").fill("Remote work");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Policy created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Inactive" }).last().click();
  await expect(page.getByText("Policy updated")).toBeVisible({ timeout: 5000 });
});

test("compliance page passes", async ({ page }) => {
  await page.goto("/compliance");
  await expect(page.getByRole("heading", { name: "Compliance" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New control" }).click();
  await page.getByPlaceholder("Control name").fill("Backup test");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Control added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Pass" }).last().click();
  await expect(page.getByText("Control marked compliant")).toBeVisible({ timeout: 5000 });
});

test("training page completes", async ({ page }) => {
  await page.goto("/training");
  await expect(page.getByRole("heading", { name: "Training" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Enroll" }).click();
  await page.getByPlaceholder("Course name").fill("Security");
  await page.getByPlaceholder("Duration").fill("2h");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Course enrolled")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Complete" }).last().click();
  await expect(page.getByText("Course completed")).toBeVisible({ timeout: 5000 });
});
