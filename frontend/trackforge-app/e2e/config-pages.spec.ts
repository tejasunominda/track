import { test, expect } from "@playwright/test";

test("versions page creates a version", async ({ page }) => {
  await page.goto("/versions");
  await expect(page.getByRole("heading", { name: "Versions" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New version" }).click();
  await page.getByPlaceholder("e.g. 2.0.0").fill("2.1.0");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Version created")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("2.1.0")).toBeVisible();
});

test("time tracking logs time", async ({ page }) => {
  await page.goto("/time-tracking");
  await expect(page.getByRole("heading", { name: "Time tracking" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Log time" }).click();
  await page.getByPlaceholder("Issue ID").fill("i-5");
  await page.getByPlaceholder("Minutes").fill("30");
  await page.getByRole("button", { name: "Log", exact: true }).click();
  await expect(page.getByText("Time logged")).toBeVisible({ timeout: 5000 });
});

test("SLA page creates policy", async ({ page }) => {
  await page.goto("/s-l-a");
  await expect(page.getByRole("heading", { name: "SLA policies" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New policy" }).click();
  await page.getByPlaceholder("Policy name").fill("VIP");
  await page.getByPlaceholder("Response (min)").fill("15");
  await page.getByPlaceholder("Resolution (h)").fill("4");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("SLA policy created")).toBeVisible({ timeout: 5000 });
});

test("custom fields page adds field", async ({ page }) => {
  await page.goto("/custom-fields");
  await expect(page.getByRole("heading", { name: "Custom fields" })).toBeVisible({ timeout: 15000 });
  await page.getByPlaceholder("Field name").fill("Risk");
  await page.getByRole("button", { name: "Add" }).first().click();
  await expect(page.getByText("Custom field created")).toBeVisible({ timeout: 5000 });
});

test("automation page creates rule", async ({ page }) => {
  await page.goto("/automation");
  await expect(page.getByRole("heading", { name: "Automation" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New rule" }).click();
  await page.getByPlaceholder("Rule name").fill("Close stale issues");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Automation rule created")).toBeVisible({ timeout: 5000 });
});
