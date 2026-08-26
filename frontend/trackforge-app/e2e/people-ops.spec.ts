import { test, expect } from "@playwright/test";

test("hardware page creates", async ({ page }) => {
  await page.goto("/hardware");
  await expect(page.getByRole("heading", { name: "Hardware" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New device" }).click();
  await page.getByPlaceholder("Device").first().fill("Headset");
  await page.getByPlaceholder("Owner").first().fill("Carol");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Hardware added")).toBeVisible({ timeout: 5000 });
});

test("on-call page creates", async ({ page }) => {
  await page.goto("/on-call");
  await expect(page.getByRole("heading", { name: "On-call" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByPlaceholder("Person").first().fill("Eve");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("On-call added")).toBeVisible({ timeout: 5000 });
});

test("vacation page approves", async ({ page }) => {
  await page.goto("/vacation");
  await expect(page.getByRole("heading", { name: "Vacation" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Request" }).click();
  await page.getByPlaceholder("Person").first().fill("Frank");
  await page.getByPlaceholder("Days").first().fill("3");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Request created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Approve" }).last().click();
  await expect(page.getByText("Request approved")).toBeVisible({ timeout: 5000 });
});

test("time sheets submits", async ({ page }) => {
  await page.goto("/time-sheets");
  await expect(page.getByRole("heading", { name: "Time sheets" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New entry" }).click();
  await page.getByPlaceholder("Person").first().fill("Grace");
  await page.getByPlaceholder("Hours").first().fill("40");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Time entry created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Submit" }).last().click();
  await expect(page.getByText("Time entry submitted")).toBeVisible({ timeout: 5000 });
});

test("reminders page completes", async ({ page }) => {
  await page.goto("/reminders");
  await expect(page.getByRole("heading", { name: "Reminders" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Reminder").first().fill("Review");
  await page.getByPlaceholder("When").first().fill("Friday");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Reminder created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Done" }).last().click();
  await expect(page.getByText("Reminder completed")).toBeVisible({ timeout: 5000 });
});
