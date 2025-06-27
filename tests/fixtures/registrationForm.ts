import { test as base } from "@playwright/test";
import RegistrationForm from "../models/RegistrationForm";

// Declare the types of your fixtures.
type MyFixtures = {
	registrationForm: RegistrationForm;
};

// Extend base test by providing "registrationForm".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
	registrationForm: async ({ page }, use) => {
		// Set up the fixture.
		const registrationForm = new RegistrationForm(page);
		await registrationForm.openRegistrationForm();

		// Use the fixture value in the test.
		await use(registrationForm);
	},
});
export { expect } from "@playwright/test";
