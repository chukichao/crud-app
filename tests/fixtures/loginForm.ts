import { test as base } from "@playwright/test";
import LoginForm from "../models/LoginForm";

// Declare the types of your fixtures.
type MyFixtures = {
	loginForm: LoginForm;
};

// Extend base test by providing "loginForm".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
	loginForm: async ({ page }, use) => {
		// Set up the fixture.
		const loginForm = new LoginForm(page);
		await loginForm.openLoginForm();

		// Use the fixture value in the test.
		await use(loginForm);
	},
});
export { expect } from "@playwright/test";
