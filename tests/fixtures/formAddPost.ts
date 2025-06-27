import { test as base } from "@playwright/test";
import FormAddPost from "../models/FormAddPost";

// Declare the types of your fixtures.
type MyFixtures = {
	formAddPost: FormAddPost;
};

// Extend base test by providing "formAddPost".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
	formAddPost: async ({ page }, use) => {
		// Set up the fixture.
		const formAddPost = new FormAddPost(page);

		// Use the fixture value in the test.
		await use(formAddPost);
	},
});
export { expect } from "@playwright/test";
