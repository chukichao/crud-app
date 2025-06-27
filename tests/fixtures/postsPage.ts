import { test as base } from "@playwright/test";
import PostsPage from "../models/PostsPage";

// Declare the types of your fixtures.
type MyFixtures = {
	postsPage: PostsPage;
};

// Extend base test by providing "postsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
	postsPage: async ({ page }, use) => {
		// Set up the fixture.
		const mainPage = new PostsPage(page);
		await mainPage.openPostsPage();

		// Use the fixture value in the test.
		await use(mainPage);
	},
});
export { expect } from "@playwright/test";
