import { expect, test } from "@playwright/test";

test.describe("Add Post", () => {
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
		// submit button
		await page.locator("form").getByRole("button", { name: "Sign in" }).click();

		await page.getByRole("link", { name: "Posts" }).click();
		await page.getByRole("button", { name: "Add new post" }).click();
	});

	test("visibility of elements of adding a new post", async ({ page }) => {
		// header
		await expect(
			page.getByRole("heading", { name: "Create post" }),
		).toBeVisible();

		// title
		await expect(page.getByRole("textbox", { name: "title" })).toBeVisible();

		// description
		await expect(
			page.getByRole("textbox", { name: "description" }),
		).toBeVisible();

		// submit button (length of fields < 3; disabled)
		await expect(page.getByRole("button", { name: "Сonfirm" })).toBeDisabled();

		// filling in the fields
		await page.getByRole("textbox", { name: "title" }).fill("123");
		await page.getByRole("textbox", { name: "description" }).fill("123");

		// submit button
		await expect(
			page.getByRole("button", { name: "Сonfirm" }),
		).not.toBeDisabled();
	});

	test("add new post", async ({ page }) => {
		const newPost = {
			title: "post title",
			description: "post description",
		};

		// filling in the fields
		await page.getByRole("textbox", { name: "title" }).fill(newPost.title);
		await page
			.getByRole("textbox", { name: "description" })
			.fill(newPost.description);

		// submit
		await page.getByRole("button", { name: "Сonfirm" }).click();

		// check
		await expect(
			page
				.getByRole("listitem")
				.filter({ hasText: newPost.title })
				.filter({ hasText: newPost.description }),
		).toBeVisible();
	});
});
