import { expect, test } from "@playwright/test";

test.describe("Update Post", () => {
	const newPost = {
		title: "post title",
		description: "post description",
	};

	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/");
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

		// add new post
		await page.getByRole("link", { name: "Posts" }).click();
		await page.getByRole("button", { name: "Add new post" }).click();

		// filling in the fields
		await page.getByRole("textbox", { name: "title" }).fill(newPost.title);
		await page
			.getByRole("textbox", { name: "description" })
			.fill(newPost.description);

		// submit
		await page.getByRole("button", { name: "Сonfirm" }).click();

		// await page
		// 	.getByRole("listitem")
		// 	.filter({ hasText: `newPost.title` })
		// 	.getByRole("button")
		// 	.nth(1)
		// 	.click();

		await page
			.getByRole("listitem")
			.filter({ hasText: "× 101. post titlepost" })
			.getByRole("button")
			.nth(1)
			.click();
	});

	test("visibility of post update elements", async ({ page }) => {
		// header
		await expect(
			page.getByRole("heading", { name: "Update post" }),
		).toBeVisible();

		// title
		await expect(page.getByRole("heading", { name: "Title:" })).toBeVisible();
		await expect(page.getByRole("textbox", { name: "title" })).toHaveValue(
			newPost.title,
		);

		// description
		await expect(
			page.getByRole("heading", { name: "Description:" }),
		).toBeVisible();
		await expect(
			page.getByRole("textbox", { name: "description" }),
		).toHaveValue(newPost.description);

		// submit button
		await expect(page.getByRole("button", { name: "Сonfirm" })).toBeVisible();
	});

	test("update post", async ({ page }) => {
		const updatedPost = {
			title: "new post title",
			description: "new post description",
		};

		// filling in the fields
		await page.getByRole("textbox", { name: "title" }).fill(updatedPost.title);

		await page
			.getByRole("textbox", { name: "description" })
			.fill(updatedPost.description);

		// submit
		await page.getByRole("button", { name: "Сonfirm" }).click();

		// check
		await expect(
			page
				.getByRole("listitem")
				.filter({ hasText: updatedPost.title })
				.filter({ hasText: updatedPost.description }),
		).toBeVisible();
	});
});
