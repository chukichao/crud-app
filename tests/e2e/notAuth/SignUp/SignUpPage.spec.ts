import { test } from "../../../fixtures/registrationForm";

test.describe("Sign up Page Tests", () => {
	test("visibility of registration elements form", async ({
		registrationForm,
	}) => {
		await registrationForm.checkVisibilityElements();
	});
});
