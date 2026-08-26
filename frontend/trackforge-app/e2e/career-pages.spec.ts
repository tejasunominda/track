import { test, expect } from "@playwright/test";

test("offboarding page completes", async ({ page }) => {
  await page.goto("/offboarding");
  await expect(page.getByRole("heading", { name: "Offboarding" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New task" }).click();
  await page.getByPlaceholder("Task").fill("Return badge");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Task created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Done" }).last().click();
  await expect(page.getByText("Offboarding completed")).toBeVisible({ timeout: 5000 });
});

test("job descriptions page creates", async ({ page }) => {
  await page.goto("/job-descriptions");
  await expect(page.getByRole("heading", { name: "Job descriptions" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New JD" }).click();
  await page.getByPlaceholder("Title").first().fill("PM");
  await page.getByPlaceholder("Level").first().fill("Senior");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Job description created")).toBeVisible({ timeout: 5000 });
});

test("org chart page creates", async ({ page }) => {
  await page.goto("/org-chart");
  await expect(page.getByRole("heading", { name: "Org chart" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New node" }).click();
  await page.getByPlaceholder("Name").first().fill("CFO");
  await page.getByPlaceholder("Reports to").fill("CEO");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Node added")).toBeVisible({ timeout: 5000 });
});

test("skills matrix page creates and levels up", async ({ page }) => {
  await page.goto("/skills-matrix");
  await expect(page.getByRole("heading", { name: "Skills matrix" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Skill").first().fill("Python");
  await page.getByPlaceholder("Person").first().fill("Eve");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Skill added")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "+" }).last().click();
  await expect(page.getByText("Skill level up")).toBeVisible({ timeout: 5000 });
});

test("career path page creates", async ({ page }) => {
  await page.goto("/career-path");
  await expect(page.getByRole("heading", { name: "Career path" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New step" }).click();
  await page.getByPlaceholder("Role").first().fill("Staff");
  await page.getByPlaceholder("Next").first().fill("Principal");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Career step added")).toBeVisible({ timeout: 5000 });
});
