import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

test.describe("Batch: admin & tasks", () => {
  test("tasks - create and complete", async ({ page }) => {
    await page.goto(`${BASE}/tasks`);
    await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
    await page.getByRole("button", { name: /New task/ }).click();
    await page.getByPlaceholder("Task title").fill("E2E test task");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E test task")).toBeVisible();
  });

  test("subtasks - create", async ({ page }) => {
    await page.goto(`${BASE}/subtasks`);
    await expect(page.getByRole("heading", { name: "Subtasks" })).toBeVisible();
    await page.getByRole("button", { name: /New subtask/ }).click();
    await page.getByPlaceholder("Subtask title").fill("E2E subtask");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E subtask")).toBeVisible();
  });

  test("checklists - create and add item", async ({ page }) => {
    await page.goto(`${BASE}/checklists`);
    await expect(page.getByRole("heading", { name: "Checklists" })).toBeVisible();
    await page.getByRole("button", { name: /New checklist/ }).click();
    await page.getByPlaceholder("Checklist name").fill("E2E list");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E list")).toBeVisible();
  });

  test("roles - create and toggle permission", async ({ page }) => {
    await page.goto(`${BASE}/roles`);
    await expect(page.getByRole("heading", { name: "Roles" })).toBeVisible();
    await page.getByRole("button", { name: /New role/ }).click();
    await page.getByPlaceholder("Role name").fill("E2E Role");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Role")).toBeVisible();
  });

  test("groups - create and add member", async ({ page }) => {
    await page.goto(`${BASE}/groups`);
    await expect(page.getByRole("heading", { name: "Groups" })).toBeVisible();
    await page.getByRole("button", { name: /New group/ }).click();
    await page.getByPlaceholder("Group name").fill("E2E Group");
    await page.locator("form").getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("E2E Group")).toBeVisible();
  });

  test("webhooks - register", async ({ page }) => {
    await page.goto(`${BASE}/webhooks`);
    await expect(page.getByRole("heading", { name: "Webhooks" })).toBeVisible();
    await page.getByRole("button", { name: /New webhook/ }).click();
    await page.getByPlaceholder("https://...").fill("https://e2e.test/hook");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByText("https://e2e.test/hook")).toBeVisible();
  });

  test("security - toggles and sliders", async ({ page }) => {
    await page.goto(`${BASE}/security`);
    await expect(page.getByRole("heading", { name: "Security" })).toBeVisible();
    await expect(page.getByText("Multi-factor authentication")).toBeVisible();
    await expect(page.getByText("API key")).toBeVisible();
  });

  test("invitations - send", async ({ page }) => {
    await page.goto(`${BASE}/invitations`);
    await expect(page.getByRole("heading", { name: "Invitations" })).toBeVisible();
    await page.getByRole("button", { name: /Invite user/ }).click();
    await page.getByPlaceholder("email@example.com").fill("e2e@test.com");
    await page.getByRole("button", { name: /Send/ }).click();
    await expect(page.getByText("e2e@test.com")).toBeVisible();
  });

  test("audit trail - filter", async ({ page }) => {
    await page.goto(`${BASE}/audit-trail`);
    await expect(page.getByRole("heading", { name: "Audit trail" })).toBeVisible();
    await page.getByRole("button", { name: "CREATE", exact: true }).click();
    await expect(page.getByText("Created issue")).toBeVisible();
  });

  test("analytics - metrics and charts", async ({ page }) => {
    await page.goto(`${BASE}/analytics`);
    await expect(page.getByRole("heading", { name: "Analytics" })).toBeVisible();
    await expect(page.getByText("Total issues")).toBeVisible();
    await expect(page.getByText("Throughput")).toBeVisible();
  });

  test("task dependencies - create", async ({ page }) => {
    await page.goto(`${BASE}/task-dependencies`);
    await expect(page.getByRole("heading", { name: "Task dependencies" })).toBeVisible();
    await page.getByRole("button", { name: /New dependency/ }).click();
    await page.getByPlaceholder("From (e.g. ENG-1)").fill("E2E-1");
    await page.getByPlaceholder("To (e.g. ENG-2)").fill("E2E-2");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("E2E-1")).toBeVisible();
  });
});
