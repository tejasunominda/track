import { test, expect } from "@playwright/test";

test("test runs page starts", async ({ page }) => {
  await page.goto("/test-runs");
  await expect(page.getByRole("heading", { name: "Test runs" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New run" }).click();
  await page.getByPlaceholder("Run name").fill("Nightly");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Run added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Start" }).last().click();
  await expect(page.getByText("Run started")).toBeVisible({ timeout: 5000 });
});

test("test cases page passes", async ({ page }) => {
  await page.goto("/test-cases");
  await expect(page.getByRole("heading", { name: "Test cases" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New case" }).click();
  await page.getByPlaceholder("Test case").fill("Login");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Test case added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Pass" }).last().click();
  await expect(page.getByText("Test case passed")).toBeVisible({ timeout: 5000 });
});

test("test plans page creates", async ({ page }) => {
  await page.goto("/test-plans");
  await expect(page.getByRole("heading", { name: "Test plans" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New plan" }).click();
  await page.getByPlaceholder("Plan name").fill("Release");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Test plan created")).toBeVisible({ timeout: 5000 });
});

test("deployments page promotes", async ({ page }) => {
  await page.goto("/deployments");
  await expect(page.getByRole("heading", { name: "Deployments" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New build" }).click();
  await page.getByPlaceholder("Build").first().fill("101");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Deployment created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Promote" }).last().click();
  await expect(page.getByText("Deployment promoted")).toBeVisible({ timeout: 5000 });
});

test("environments page toggles", async ({ page }) => {
  await page.goto("/environments");
  await expect(page.getByRole("heading", { name: "Environments" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New env" }).click();
  await page.getByPlaceholder("Environment").fill("QA");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Environment added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Toggle" }).last().click();
  await expect(page.getByText("Environment toggled")).toBeVisible({ timeout: 5000 });
});
