import { test, expect } from "@playwright/test";

test("purchase orders page sends", async ({ page }) => {
  await page.goto("/purchase-orders");
  await expect(page.getByRole("heading", { name: "Purchase orders" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New PO" }).click();
  await page.getByPlaceholder("PO name").fill("PO 9999");
  await page.getByPlaceholder("Amount").first().fill("700");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Purchase order created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Send" }).last().click();
  await expect(page.getByText("Purchase order sent")).toBeVisible({ timeout: 5000 });
});

test("onboarding page completes", async ({ page }) => {
  await page.goto("/onboarding");
  await expect(page.getByRole("heading", { name: "Onboarding" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New hire" }).click();
  await page.getByPlaceholder("Name").first().fill("Charlie");
  await page.getByPlaceholder("Role").fill("PM");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Onboarding started")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Complete" }).last().click();
  await expect(page.getByText("Onboarding completed")).toBeVisible({ timeout: 5000 });
});

test("alerts page acknowledges", async ({ page }) => {
  await page.goto("/alerts");
  await expect(page.getByRole("heading", { name: "Alerts" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New alert" }).click();
  await page.getByPlaceholder("Message").first().fill("API down");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Alert created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Ack" }).last().click();
  await expect(page.getByText("Alert acknowledged")).toBeVisible({ timeout: 5000 });
});

test("announcements page publishes", async ({ page }) => {
  await page.goto("/announcements");
  await expect(page.getByRole("heading", { name: "Announcements" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New" }).first().click();
  await page.getByPlaceholder("Title").first().fill("Release");
  await page.getByPlaceholder("Body").fill("v2 is live");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Announcement saved")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Publish" }).last().click();
  await expect(page.getByText("Announcement published")).toBeVisible({ timeout: 5000 });
});

test("calendar page creates", async ({ page }) => {
  await page.goto("/calendar");
  await expect(page.getByRole("heading", { name: "Calendar" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New event" }).click();
  await page.getByPlaceholder("Title").first().fill("Standup");
  await page.locator('input[type="date"]').first().fill("2025-12-31");
  await page.locator('input[type="time"]').first().fill("09:00");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Event created")).toBeVisible({ timeout: 5000 });
});
