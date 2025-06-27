import { expect, test } from "../../../fixtures/loginForm";

export const user = {
	username: "admin",
	password: "admin",
};

test.describe("SignIn: Process", () => {
	test("visibility of login form elements", async ({ loginForm }) => {
		await loginForm.checkVisibilityElements();
	});

	test("checking the login button", async ({ page, loginForm }) => {
		await test.step("check if login button is unavailable", async () => {
			await expect
				.soft(page.locator("form").getByRole("button", { name: "Sign in" }))
				.toBeDisabled();
		});

		await test.step("filling in form fields", async () => {
			await loginForm.fillInputFields("123", "123");
		});

		await test.step("check availability of login button", async () => {
			await expect
				.soft(page.locator("form").getByRole("button", { name: "Sign in" }))
				.not.toBeDisabled();
		});
	});

	test("error: incorrect username or password", async ({ page, loginForm }) => {
		await test.step("filling in form fields (wrong)", async () => {
			await loginForm.fillInputFields("John", "qwerty");
		});

		await test.step("press sign in", async () => {
			await page
				.locator("form")
				.getByRole("button", { name: "Sign in" })
				.click();
		});

		await test.step("operation check (error)", async () => {
			await expect
				.soft(page.getByText("incorrect username or password"))
				.toBeVisible();
		});
	});

	test("success: login", async ({ page, loginForm }) => {
		await test.step("filling in form fields", async () => {
			await loginForm.fillInputFields(user.username, user.password);
		});

		await test.step("press sign in", async () => {
			await page
				.locator("form")
				.getByRole("button", { name: "Sign in" })
				.click();
		});

		await test.step("operation check", async () => {
			await expect.soft(page.getByText(user.username)).toBeVisible();
		});

		await test.step("check private navigation links", async () => {
			await expect
				.soft(page.getByRole("link", { name: "Posts" }))
				.toBeVisible();
			await expect.soft(page.getByRole("list")).toContainText("Posts");
			await expect
				.soft(page.getByRole("link", { name: "Posts" }))
				.toHaveAttribute("href", "/posts?page=1&limit=10");
		});
	});
});
