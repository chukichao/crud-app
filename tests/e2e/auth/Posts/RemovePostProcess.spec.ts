import { expect, test } from "../../../fixtures/postsPage";

const newPost = {
	title: "post title",
	description: "post description",
};

test.describe("Remove Post: Process", () => {
	test.beforeEach(async ({ postsPage }) => {
		await postsPage.addNewPost(newPost.title, newPost.description);
		postsPage.clickRemovePost();
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
