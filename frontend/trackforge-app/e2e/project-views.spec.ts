import { test, expect } from "@playwright/test";

test("boards page creates", async ({ page }) => {
  await page.goto("/boards");
  await expect(page.getByRole("heading", { name: "Boards" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New board" }).click();
  await page.getByPlaceholder("Board name").fill("Backlog board");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Board created")).toBeVisible({ timeout: 5000 });
});

test("gantt page creates", async ({ page }) => {
  await page.goto("/gantt");
  await expect(page.getByRole("heading", { name: "Gantt" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New task" }).click();
  await page.getByPlaceholder("Task name").fill("UAT");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Task added")).toBeVisible({ timeout: 5000 });
});

test("files page creates", async ({ page }) => {
  await page.goto("/files");
  await expect(page.getByRole("heading", { name: "Files" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New file" }).click();
  await page.getByPlaceholder("File name").fill("report.pdf");
  await page.getByPlaceholder("Size").fill("2 MB");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("File added")).toBeVisible({ timeout: 5000 });
});

test("documents page creates and publishes", async ({ page }) => {
  await page.goto("/documents");
  await expect(page.getByRole("heading", { name: "Documents" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New doc" }).click();
  await page.getByPlaceholder("Document title").fill("API guide");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Document created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Publish" }).last().click();
  await expect(page.getByText("Document published")).toBeVisible({ timeout: 5000 });
});

test("hiring page creates and fills", async ({ page }) => {
  await page.goto("/hiring");
  await expect(page.getByRole("heading", { name: "Hiring" })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "New req" }).click();
  await page.getByPlaceholder("Role").fill("SRE");
  await page.getByRole("button", { name: "Create" }).last().click();
  await expect(page.getByText("Requisition created")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Fill" }).last().click();
  await expect(page.getByText("Requisition filled")).toBeVisible({ timeout: 5000 });
});
