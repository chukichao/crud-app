import { expect, test } from "@playwright/test";

test.describe("Sign up Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/signup");
	});

	test("visibility of registration elements", async ({ page }) => {
		// title
		await expect(
			page.getByRole("heading", { name: "Registration Page" }),
		).toBeVisible();

		// name
		await expect(page.getByText("Name:")).toBeVisible();
		await expect(page.getByRole("textbox", { name: "Name:" })).toBeVisible();

		// age
		await expect(page.getByText("Age:")).toBeVisible();
		await expect(page.getByRole("spinbutton", { name: "Age:" })).toBeVisible();

		// password
		await expect(page.getByText("Password:", { exact: true })).toBeVisible();
		await expect(
			page.getByRole("textbox", { name: "Password:", exact: true }),
		).toBeVisible();

		// confirm password
		await expect(page.getByText("Confirm Password:")).toBeVisible();
		await expect(
			page.getByRole("textbox", { name: "Confirm Password:" }),
		).toBeVisible();

		// privacy policy
		await expect(page.getByText("I have read the privacy")).toBeVisible();
		await expect(
			page.getByRole("checkbox", { name: "I have read the privacy" }),
		).toBeVisible();

		// country
		await expect(page.getByText("Country:")).toBeVisible();
		await expect(page.getByLabel("Country:")).toBeVisible();

		// date of birth
		await expect(page.getByText("Date of birth:")).toBeVisible();
		await expect(
			page.getByRole("textbox", { name: "Date of birth:" }),
		).toBeVisible();

		// gender
		await expect(page.getByText("Gender: Male Female")).toBeVisible();

		await expect(
			page.getByRole("radio", { name: "Male", exact: true }),
		).toBeVisible();
		await expect(page.getByRole("radio", { name: "Female" })).toBeVisible();

		// skills
		await expect(page.getByText("Skills: HTML CSS JS")).toBeVisible();

		await expect(page.getByRole("checkbox", { name: "HTML" })).toBeVisible();
		await expect(page.getByRole("checkbox", { name: "CSS" })).toBeVisible();
		await expect(page.getByRole("checkbox", { name: "JS" })).toBeVisible();

		// submit
		await expect(
			page.getByRole("main").getByRole("button", { name: "Sign up" }),
		).toBeVisible();
	});
});
