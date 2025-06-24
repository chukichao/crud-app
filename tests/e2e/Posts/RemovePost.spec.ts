import { expect, test } from "@playwright/test";

test.describe("Remove Post", () => {
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
		// 	.filter({ hasText: newPost.title })
		// 	.getByRole("button")
		// 	.first()
		// 	.click();

		await page
			.getByRole("listitem")
			.filter({ hasText: "× 101. post titlepost" })
			.getByRole("button")
			.first()
			.click();
	});

	test("remove post", async ({ page }) => {
		// check
		await expect(
			page
				.getByRole("listitem")
				.filter({ hasText: newPost.title })
				.filter({ hasText: newPost.description }),
		).not.toBeVisible();
	});
});
