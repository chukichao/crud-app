import { expect, test } from "../../../fixtures/formUpdatePost";
import PostsPage from "../../../models/PostsPage";
import FormAddPost from "../../../models/FormAddPost";

const newPost = {
	title: "post title",
	description: "post description",
};

const updatedPost = {
	title: "new post title",
	description: "new post description",
};

let postsPage: PostsPage;
let formAddPost: FormAddPost;

test.describe("Update Post: Process", () => {
	test.beforeEach(async ({ page }) => {
		postsPage = new PostsPage(page);
		formAddPost = new FormAddPost(page);

		await postsPage.openPostsPage();
		await postsPage.clickAddNewPost();
		await formAddPost.addNewPost(newPost.title, newPost.description);
		await postsPage.clickEditPost();
	});

	test("visibility of post update elements", async ({
		page,
		formUpdatePost,
	}) => {
		await formUpdatePost.checkVisibilityElements();

		await test.step("checking the value of form elements", async () => {
			await expect
				.soft(page.getByRole("textbox", { name: "title" }))
				.toHaveValue(newPost.title);
			await expect
				.soft(page.getByRole("textbox", { name: "description" }))
				.toHaveValue(newPost.description);
		});
	});

	test("update post", async ({ page, formUpdatePost }) => {
		await test.step("filling in form fields", async () => {
			formUpdatePost.updatePost(updatedPost.title, updatedPost.description);
		});

		await test.step("operation check", async () => {
			await expect
				.soft(page.getByRole("listitem").filter({ hasText: updatedPost.title }))
				.toBeVisible();
		});
	});
});
