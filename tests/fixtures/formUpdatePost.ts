import { test as base } from "@playwright/test";
import FormUpdatePost from "../models/FormUpdatePost";

// Declare the types of your fixtures.
type MyFixtures = {
	formUpdatePost: FormUpdatePost;
};

// Extend base test by providing "formUpdatePost".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
	formUpdatePost: async ({ page }, use) => {
		// Set up the fixture.
		const formUpdatePost = new FormUpdatePost(page);

		// Use the fixture value in the test.
		await use(formUpdatePost);
	},
});
export { expect } from "@playwright/test";
