import { expect, test } from "@playwright/test";

test.describe("Main Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/");
	});

	test("correct page language", async ({ page }) => {
		await expect.soft(page.locator("html")).toHaveAttribute("lang", "en");
	});

	test("correct page title", async ({ page }) => {
		await expect.soft(page).toHaveTitle(/Vue 3/);
	});

	test("visibility of the main blocks of the page", async ({ page }) => {
		// header
		await expect.soft(page.getByText("crudApp_HomeAbout UsSign")).toBeVisible();

		// footer
		await expect.soft(page.getByRole("contentinfo")).toBeVisible();
	});

	test("check navigation links (header)", async ({ page }) => {
		// home
		await expect.soft(page.getByRole("link", { name: "Home" })).toBeVisible();
		await expect
			.soft(page.getByRole("link", { name: "Home" }))
			.toContainText("Home");
		await expect
			.soft(page.getByRole("link", { name: "Home" }))
			.toHaveAttribute("href", "/");

		// about
		await expect
			.soft(page.getByRole("link", { name: "About Us" }))
			.toBeVisible();
		await expect
			.soft(page.getByRole("link", { name: "About Us" }))
			.toContainText("About Us");
		await expect
			.soft(page.getByRole("link", { name: "About Us" }))
			.toHaveAttribute("href", "/about");

		// posts (available to authorized users)
		await expect
			.soft(page.getByRole("link", { name: "Posts" }))
			.not.toBeVisible();
	});

	test("cookie notification visibility", async ({ page }) => {
		// inner elements
		await expect
			.soft(page.getByRole("heading", { name: "Welcome!" }))
			.toBeVisible();
		await expect
			.soft(page.getByText("Our platform uses cookies to"))
			.toBeVisible();
		await expect
			.soft(page.getByRole("button", { name: "Accept" }))
			.toBeVisible();

		await page.getByRole("button", { name: "Accept" }).click();

		await expect
			.soft(page.getByText("Welcome! Our platform uses"))
			.not.toBeVisible();
	});
});
