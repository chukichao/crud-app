import { expect, test } from "@playwright/test";

export const user = {
	username: "John",
	password: "qwerty",
};

test.describe("SignUp: Process", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/signup");
	});

	test("error: required field", async ({ page }) => {
		await test.step("filling in form fields (unfilled)", async () => {
			await page.getByRole("textbox", { name: "Name:" }).fill("John");
			await page
				.getByRole("textbox", { name: "Password:", exact: true })
				.fill("qwerty");
			await page
				.getByRole("textbox", { name: "Confirm Password:" })
				.fill("qwerty");
			await page
				.getByRole("checkbox", { name: "I have read the privacy" })
				.check();
		});

		await test.step("press sign in", async () => {
			await page
				.getByRole("main")
				.getByRole("button", { name: "Sign up" })
				.click();
		});

		await test.step("operation check (error)", async () => {
			await expect.soft(page.getByText("required field")).toBeVisible();
		});
	});

	test("error: passwords must match", async ({ page }) => {
		await test.step("filling in form fields (wrong)", async () => {
			await page.getByRole("textbox", { name: "Name:" }).fill("John");
			await page.getByRole("spinbutton", { name: "Age:" }).fill("42");
			await page
				.getByRole("textbox", { name: "Password:", exact: true })
				.fill("qwerty");
			await page
				.getByRole("textbox", { name: "Confirm Password:" })
				.fill("qwerty123");
			await page
				.getByRole("checkbox", { name: "I have read the privacy" })
				.check();
		});

		await test.step("press sign in", async () => {
			await page
				.getByRole("main")
				.getByRole("button", { name: "Sign up" })
				.click();
		});

		await test.step("operation check (error)", async () => {
			await expect.soft(page.getByText("passwords must match")).toBeVisible();
		});
	});

	test("success: create new user", async ({ page }) => {
		await test.step("filling in form fields (correct)", async () => {
			await page.getByRole("textbox", { name: "Name:" }).fill(user.username);
			await page.getByRole("spinbutton", { name: "Age:" }).fill("42");
			await page
				.getByRole("textbox", { name: "Password:", exact: true })
				.fill(user.password);
			await page
				.getByRole("textbox", { name: "Confirm Password:" })
				.fill(user.password);
			await page
				.getByRole("checkbox", { name: "I have read the privacy" })
				.check();
		});

		await test.step("press sign in", async () => {
			await page
				.getByRole("main")
				.getByRole("button", { name: "Sign up" })
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
