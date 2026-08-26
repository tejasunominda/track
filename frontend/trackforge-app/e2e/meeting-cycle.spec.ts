import { test, expect } from "@playwright/test";

test("performance review submits", async ({ page }) => {
  await page.goto("/performance-review");
  await expect(page.getByRole("heading", { name: "Performance review" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Review name").fill("Q3");
  await page.getByPlaceholder("Person").first().fill("Eve");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Review created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Submit" }).last().click();
  await expect(page.getByText("Review submitted")).toBeVisible({ timeout: 5000 });
});

test("one on one completes", async ({ page }) => {
  await page.goto("/one-on-one");
  await expect(page.getByRole("heading", { name: "1:1s" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Attendee").first().fill("Frank");
  await page.getByPlaceholder("Notes").first().fill("Career");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("1:1 created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Done" }).last().click();
  await expect(page.getByText("1:1 completed")).toBeVisible({ timeout: 5000 });
});

test("standups page creates", async ({ page }) => {
  await page.goto("/standups");
  await expect(page.getByRole("heading", { name: "Standups" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New update" }).click();
  await page.getByPlaceholder("Person").first().fill("Grace");
  await page.getByPlaceholder("Update").first().fill("Done");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Standup added")).toBeVisible({ timeout: 5000 });
});

test("retrospectives page creates", async ({ page }) => {
  await page.goto("/retrospectives");
  await expect(page.getByRole("heading", { name: "Retrospectives" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New item" }).click();
  await page.getByPlaceholder("Item").first().fill("Faster CI");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Retro item added")).toBeVisible({ timeout: 5000 });
});

test("meeting notes page creates", async ({ page }) => {
  await page.goto("/meeting-notes");
  await expect(page.getByRole("heading", { name: "Meeting notes" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New note" }).click();
  await page.getByPlaceholder("Title").first().fill("Kickoff");
  await page.locator('input[type="date"]').first().fill("2025-12-31");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Note saved")).toBeVisible({ timeout: 5000 });
});
