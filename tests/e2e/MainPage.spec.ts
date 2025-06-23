import { expect, test } from "@playwright/test";

test.describe("Main Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:8000/");
	});

	test("correct page title", async ({ page }) => {
		await expect(page).toHaveTitle(/Vue 3/);
	});

	test("cookie notification visibility", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Welcome!" })).toBeVisible();
		await expect(page.getByText("Our platform uses cookies to")).toBeVisible();
		await expect(page.getByRole("button", { name: "Accept" })).toBeVisible();

		await page.getByRole("button", { name: "Accept" }).click();

		await expect(
			page.getByRole("button", { name: "Accept" }),
		).not.toBeVisible();
	});

	test("visibility of the main blocks of the page", async ({ page }) => {
		// header
		await expect(page.getByText("crudApp_HomeAbout UsSign")).toBeVisible();

		// footer
		await expect(page.getByRole("contentinfo")).toBeVisible();
	});

	test("navigation links", async ({ page }) => {
		// home
		await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
		await expect(page.getByRole("list")).toContainText("Home");
		await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
			"href",
			"/",
		);

		// about
		await expect(page.getByRole("link", { name: "About Us" })).toBeVisible();
		await expect(page.getByRole("list")).toContainText("About Us");
		await expect(page.getByRole("link", { name: "About Us" })).toHaveAttribute(
			"href",
			"/about",
		);

		// posts (available to authorized users)
		await expect(page.getByRole("link", { name: "Posts" })).not.toBeVisible();
	});
});
