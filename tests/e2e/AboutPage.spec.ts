import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/about");
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
