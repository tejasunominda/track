import { test, expect } from "@playwright/test";

test("uploads an attachment to an issue", async ({ page }) => {
  await page.goto("/issues/i-1");
  await expect(page.getByText("Implement user authentication")).toBeVisible({ timeout: 10000 });

  await page.getByRole("button", { name: "Upload file" }).click();

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles({
    name: "test-attachment.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Hello TrackForge"),
  });

  await expect(page.getByText("uploaded-file.txt")).toBeVisible();
});
