import { test, expect } from "@playwright/test";

// FIXME: dnd-kit requires a custom pointer-event harness that simulates
// setPointerCapture correctly. Skipped as a known issue until implemented.
test.fixme("drags an issue to another column", async ({ page }) => {
  await page.goto("/projects/p-1/board");
  await expect(page.getByTestId("column-s-todo")).toBeVisible({ timeout: 10000 });

  // Placeholder: drag card to target column and assert it moved.
  // await dragCard(page, "issue-card-i-1", "column-s-inprogress");
  // await expect(page.getByTestId("column-s-inprogress")).toContainText("Implement user authentication");
});
