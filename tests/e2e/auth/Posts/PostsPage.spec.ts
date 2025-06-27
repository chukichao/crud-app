import { test } from "../../../fixtures/postsPage";

test.describe("Posts Page Tests", () => {
	test("visibility of elements", async ({ postsPage }) => {
		await postsPage.checkPostsPageElements();
	});
});
