import { test, expect, Page, Locator } from "@playwright/test";

interface IElement {
	title: string;
	locator: (page: Page) => Locator;
}

export default class RegistrationForm {
	readonly elements: IElement[];

	constructor(readonly page: Page) {
		this.page = page;

		this.elements = [
			{
				title: "Heading",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Registration Page" }),
			},
			{
				title: "Name",
				locator: (page: Page): Locator => page.getByText("Name:"),
			},
			{
				title: "Name field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "Name:" }),
			},
			{
				title: "Age",
				locator: (page: Page): Locator => page.getByText("Age:"),
			},
			{
				title: "Age field",
				locator: (page: Page): Locator =>
					page.getByRole("spinbutton", { name: "Age:" }),
			},
			{
				title: "Password",
				locator: (page: Page): Locator =>
					page.getByText("Password:", { exact: true }),
			},
			{
				title: "Password field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "Password:", exact: true }),
			},
			{
				title: "Confirm Password",
				locator: (page: Page): Locator => page.getByText("Confirm Password:"),
			},
			{
				title: "Confirm Password field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "Confirm Password:" }),
			},
			{
				title: "Privacy policy",
				locator: (page: Page): Locator =>
					page.getByText("I have read the privacy"),
			},
			{
				title: "Privacy policy field",
				locator: (page: Page): Locator =>
					page.getByRole("checkbox", { name: "I have read the privacy" }),
			},
			{
				title: "Sign up button",
				locator: (page: Page): Locator =>
					page.getByRole("main").getByRole("button", { name: "Sign up" }),
			},
		];
	}

	async openRegistrationForm() {
		await this.page.goto("https://crud-app-qeja.onrender.com/signup");
	}

	async checkVisibilityElements() {
		for (const { title, locator } of this.elements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}
}
