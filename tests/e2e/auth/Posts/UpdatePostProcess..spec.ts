import { expect, test } from "../../../fixtures/postsPage";

const newPost = {
	title: "post title",
	description: "post description",
};

const updatedPost = {
	title: "new post title",
	description: "new post description",
};

test.describe("Update Post: Process", () => {
	test.beforeEach(async ({ postsPage }) => {
		await postsPage.addNewPost(newPost.title, newPost.description);
		postsPage.clickEditPost();
	});

	test("visibility of post update elements", async ({ page, postsPage }) => {
		await postsPage.checkFormUpdatePostElements();

		await test.step("checking the value of form elements", async () => {
			await expect
				.soft(page.getByRole("textbox", { name: "title" }))
				.toHaveValue(newPost.title);
			await expect
				.soft(page.getByRole("textbox", { name: "description" }))
				.toHaveValue(newPost.description);
		});
	});

	test("update post", async ({ page }) => {
		await test.step("filling in form fields", async () => {
			await page.getByRole("textbox", { name: "title" }).clear();
			await page
				.getByRole("textbox", { name: "title" })
				.fill(updatedPost.title);

			await page.getByRole("textbox", { name: "description" }).clear();
			await page
				.getByRole("textbox", { name: "description" })
				.fill(updatedPost.description);
		});

		await test.step("press confirm", async () => {
			await page.getByRole("button", { name: "Сonfirm" }).click();
		});

		await test.step("operation check", async () => {
			await expect
				.soft(page.getByRole("listitem").filter({ hasText: updatedPost.title }))
				.toBeVisible();
		});
	});
});
