import { expect, test } from "@playwright/test";

test.describe("About Page Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/about");
	});

	test("display active link", async ({ page }) => {
		test.step("check active link", async () => {
			await expect
				.soft(page.getByRole("link", { name: "About Us" }))
				.toHaveClass("active");
		});
	});

	test("visibility of text content", async ({ page }) => {
		test.step("check header", async () => {
			await expect
				.soft(page.getByRole("heading", { name: "About Page" }))
				.toBeVisible();
		});

		test.step("check text content", async () => {
			await expect
				.soft(page.getByText("Lorem ipsum dolor sit amet"))
				.toBeVisible();
		});
	});
});
