import { test, expect, Page, Locator } from "@playwright/test";

interface IElement {
	title: string;
	locator: (page: Page) => Locator;
}

export default class LoginForm {
	readonly elements: IElement[];

	constructor(readonly page: Page) {
		this.page = page;

		this.elements = [
			{
				title: "Heading",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Login" }),
			},
			{
				title: "Username field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "username" }),
			},
			{
				title: "Password field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "password" }),
			},
		];
	}

	async openLoginForm() {
		await this.page.goto("https://crud-app-qeja.onrender.com/");
		await this.page.getByRole("button", { name: "Sign in" }).click();
	}

	async checkVisibilityElements() {
		for (const { title, locator } of this.elements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}

	async fillInputFields(title: string, description: string) {
		await this.page.getByRole("textbox", { name: "username" }).fill(title);
		await this.page
			.getByRole("textbox", { name: "password" })
			.fill(description);
	}
}
