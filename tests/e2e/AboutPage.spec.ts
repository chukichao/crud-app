import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:8000/about");
	});

	test("visibility of text content", async ({ page }) => {
		// title
		await expect(
			page.getByRole("heading", { name: "About Page" }),
		).toBeVisible();

		// content
		await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
	});
});
