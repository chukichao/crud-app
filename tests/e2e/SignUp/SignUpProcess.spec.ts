import { expect, test } from "@playwright/test";

test.describe("SignUp: Process", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/signup");
	});

	test("error: required field", async ({ page }) => {
		// name
		await page.getByRole("textbox", { name: "Name:" }).fill("John");

		// age (unfilled)

		// password
		await page
			.getByRole("textbox", { name: "Password:", exact: true })
			.fill("qwerty");

		// confirm password
		await page
			.getByRole("textbox", { name: "Confirm Password:" })
			.fill("qwerty");

		// privacy policy
		await page
			.getByRole("checkbox", { name: "I have read the privacy" })
			.check();

		// submit
		await page
			.getByRole("main")
			.getByRole("button", { name: "Sign up" })
			.click();

		// received error
		await expect(page.getByText("required field")).toBeVisible();
	});

	test("error: passwords must match", async ({ page }) => {
		// name
		await page.getByRole("textbox", { name: "Name:" }).fill("John");

		// age
		await page.getByRole("spinbutton", { name: "Age:" }).fill("42");

		// password
		await page
			.getByRole("textbox", { name: "Password:", exact: true })
			.fill("qwerty");

		// confirm password (wrong)
		await page
			.getByRole("textbox", { name: "Confirm Password:" })
			.fill("qwerty123");

		// privacy policy
		await page
			.getByRole("checkbox", { name: "I have read the privacy" })
			.check();

		// submit
		await page
			.getByRole("main")
			.getByRole("button", { name: "Sign up" })
			.click();

		// received error
		await expect(page.getByText("passwords must match")).toBeVisible();
	});

	test("success: create new user", async ({ page }) => {
		const userName = "John";

		// name
		await page.getByRole("textbox", { name: "Name:" }).fill(userName);

		// age
		await page.getByRole("spinbutton", { name: "Age:" }).fill("42");

		// password
		await page
			.getByRole("textbox", { name: "Password:", exact: true })
			.fill("qwerty");

		// confirm password
		await page
			.getByRole("textbox", { name: "Confirm Password:" })
			.fill("qwerty");

		// privacy policy
		await page
			.getByRole("checkbox", { name: "I have read the privacy" })
			.check();

		// submit
		await page
			.getByRole("main")
			.getByRole("button", { name: "Sign up" })
			.click();

		// user data (header)
		await expect(page.getByRole("img")).toBeVisible();
		await expect(page.getByText(userName)).toBeVisible();

		// navigation: posts (available to authorized users)
		await expect(page.getByRole("link", { name: "Posts" })).toBeVisible();
		await expect(page.getByRole("list")).toContainText("Posts");
		await expect(page.getByRole("link", { name: "Posts" })).toHaveAttribute(
			"href",
			"/posts?page=1&limit=10",
		);
	});
});
