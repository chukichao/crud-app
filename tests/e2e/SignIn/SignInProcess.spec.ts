import { expect, test } from "@playwright/test";

test.describe("SignIn: Process", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/");

		await page.getByRole("button", { name: "Sign in" }).click();
	});

	test("visibility of login elements", async ({ page }) => {
		// header
		await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

		// username
		await expect(page.getByRole("textbox", { name: "username" })).toBeVisible();

		// password
		await expect(page.getByRole("textbox", { name: "password" })).toBeVisible();

		// submit button (length of fields < 3; disabled)
		await expect(
			page.locator("form").getByRole("button", { name: "Sign in" }),
		).toBeDisabled();

		// filling in the fields
		await page.getByRole("textbox", { name: "username" }).fill("123");
		await page.getByRole("textbox", { name: "password" }).fill("123");

		// submit button
		await expect(
			page.locator("form").getByRole("button", { name: "Sign in" }),
		).not.toBeDisabled();
	});

	test("error: incorrect username or password", async ({ page }) => {
		// filling in the fields (wrong)
		await page.getByRole("textbox", { name: "username" }).fill("John");
		await page.getByRole("textbox", { name: "password" }).fill("qwerty");

		// submit
		await page.locator("form").getByRole("button", { name: "Sign in" }).click();

		// received error
		await expect(
			page.getByText("incorrect username or password"),
		).toBeVisible();
	});

	test("success: login", async ({ page }) => {
		const user = {
			username: "admin",
			password: "admin",
		};

		// filling in the fields (correct)
		await page.getByRole("textbox", { name: "username" }).fill(user.username);
		await page.getByRole("textbox", { name: "password" }).fill(user.password);

		// submit
		await page.locator("form").getByRole("button", { name: "Sign in" }).click();

		// user data (header)
		await expect(page.getByRole("img")).toBeVisible();
		await expect(page.getByText(user.username)).toBeVisible();

		// navigation: posts (available to authorized users)
		await expect(page.getByRole("link", { name: "Posts" })).toBeVisible();
		await expect(page.getByRole("list")).toContainText("Posts");
		await expect(page.getByRole("link", { name: "Posts" })).toHaveAttribute(
			"href",
			"/posts?page=1&limit=10",
		);
	});
});
