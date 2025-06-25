import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/about");
	});

	test("display active link", async ({ page }) => {
		await expect
			.soft(page.getByRole("link", { name: "About Us" }))
			.toHaveClass("active");
	});

	test("visibility of text content", async ({ page }) => {
		// header
		await expect
			.soft(page.getByRole("heading", { name: "About Page" }))
			.toBeVisible();

		// text content
		await expect
			.soft(page.getByText("Lorem ipsum dolor sit amet"))
			.toBeVisible();
	});
});
