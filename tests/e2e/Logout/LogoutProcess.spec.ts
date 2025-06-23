import { expect, test } from "@playwright/test";

test.describe("Logout: Process", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:8000/");
		await page.getByRole("button", { name: "Sign in" }).click();

		const user = {
			username: "admin",
			password: "admin",
		};

		// username
		await page.getByRole("textbox", { name: "username" }).fill(user.username);
		// password
		await page.getByRole("textbox", { name: "password" }).fill(user.password);
		// submit
		await page.locator("form").getByRole("button", { name: "Sign in" }).click();

		await page.getByRole("button", { name: "Logout" }).click();
	});

	test("visibility of logout elements", async ({ page }) => {
		// question
		await expect(
			page.getByRole("heading", { name: "Are you sure?" }),
		).toBeVisible();

		// answers
		await expect(page.getByRole("button", { name: "Yes" })).toBeVisible();
		await expect(page.getByRole("button", { name: "No" })).toBeVisible();
	});

	test("logout", async ({ page }) => {
		await page.getByRole("button", { name: "Yes" }).click();

		await expect(page.getByText("crudApp_HomeAbout UsSign")).toBeVisible();
		await expect(page.getByText("Home Page Lorem ipsum dolor")).toBeVisible();
	});
});
