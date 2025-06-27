import { expect, test } from "../../../fixtures/formAddPost";
import PostsPage from "../../../models/PostsPage";

const newPost = {
	title: "post title",
	description: "post description",
};

let postsPage: PostsPage;

test.describe("Add Post: Process", () => {
	test.beforeEach(async ({ page }) => {
		postsPage = new PostsPage(page);

		await postsPage.openPostsPage();
		await postsPage.clickAddNewPost();
	});

	test("visibility of add form elements", async ({ formAddPost }) => {
		await formAddPost.checkVisibilityElements();
	});

	test("checking the add button", async ({ page }) => {
		await test.step("check if add button is unavailable", async () => {
			await expect
				.soft(page.getByRole("button", { name: "Сonfirm" }))
				.toBeDisabled();
		});

		await test.step("filling in form fields", async () => {
			await page.getByRole("textbox", { name: "title" }).fill("123");
			await page.getByRole("textbox", { name: "description" }).fill("123");
		});

		await test.step("check availability of add button", async () => {
			await expect
				.soft(page.getByRole("button", { name: "Сonfirm" }))
				.not.toBeDisabled();
		});
	});

	test("add new post", async ({ page, formAddPost }) => {
		await test.step("filling in form fields", async () => {
			await formAddPost.addNewPost(newPost.title, newPost.description);
		});

		await test.step("operation check", async () => {
			await expect
				.soft(
					page
						.getByRole("listitem")
						.filter({ hasText: newPost.title })
						.filter({ hasText: newPost.description }),
				)
				.toBeVisible();
		});
	});
});
