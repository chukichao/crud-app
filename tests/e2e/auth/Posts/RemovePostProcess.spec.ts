import { expect, test } from "../../../fixtures/formAddPost";
import PostsPage from "../../../models/PostsPage";

const newPost = {
	title: "post title",
	description: "post description",
};

let postsPage: PostsPage;

test.describe("Remove Post: Process", () => {
	test.beforeEach(async ({ page, formAddPost }) => {
		postsPage = new PostsPage(page);

		await postsPage.openPostsPage();
		await postsPage.clickAddNewPost();

		await formAddPost.addNewPost(newPost.title, newPost.description);
		await postsPage.clickRemovePost();
	});

	test("remove post", async ({ page }) => {
		await test.step("operation check", async () => {
			await expect
				.soft(
					page
						.getByRole("listitem")
						.filter({ hasText: newPost.title })
						.filter({ hasText: newPost.description }),
				)
				.not.toBeVisible();
		});
	});
});
