import { test, expect } from "@playwright/test";

test("profile page edits", async ({ page }) => {
  await page.goto("/profile");
  await expect(page.getByRole("heading", { name: "Your profile" })).toBeVisible({ timeout: 15000 });
  await page.locator('input[type="text"]').first().fill("Engineering Lead");
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page.getByText("Profile saved")).toBeVisible({ timeout: 5000 });
});

test("help page search", async ({ page }) => {
  await page.goto("/help");
  await expect(page.getByRole("heading", { name: "Help center" })).toBeVisible({ timeout: 15000 });
  await page.getByPlaceholder("Search help articles…").fill("TQL");
  await expect(page.getByText("Using TQL search")).toBeVisible();
  await expect(page.getByText("How to create an issue")).not.toBeVisible();
});

test("labels page adds and removes", async ({ page }) => {
  await page.goto("/labels");
  await expect(page.getByRole("heading", { name: "Labels" })).toBeVisible({ timeout: 15000 });
  await page.getByPlaceholder("New label…").fill("urgent");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Label created")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("urgent")).toBeVisible();
});

test("issue types page adds", async ({ page }) => {
  await page.goto("/issue-types");
  await expect(page.getByRole("heading", { name: "Issue types" })).toBeVisible({ timeout: 15000 });
  await page.getByPlaceholder("New issue type…").fill("Spike");
  await page.getByRole("button", { name: "Add" }).first().click();
  await expect(page.getByText("Issue type created")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Spike")).toBeVisible();
});

test("workflows page adds", async ({ page }) => {
  await page.goto("/workflows");
  await expect(page.getByRole("heading", { name: "Workflows" })).toBeVisible({ timeout: 15000 });
  await page.getByPlaceholder("New workflow…").fill("Release workflow");
  await page.getByRole("button", { name: "Add" }).first().click();
  await expect(page.getByText("Workflow created")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Release workflow")).toBeVisible();
});
