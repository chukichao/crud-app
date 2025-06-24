import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/");
	});

	test("visibility of text content", async ({ page }) => {
		// title
		await expect(
			page.getByRole("heading", { name: "Home Page" }),
		).toBeVisible();

		// content
		await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
	});
});
