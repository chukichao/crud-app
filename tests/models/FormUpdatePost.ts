import { test, expect, Page, Locator } from "@playwright/test";

interface IElement {
	title: string;
	locator: (page: Page) => Locator;
}

export default class FormUpdatePost {
	readonly elements: IElement[];

	constructor(readonly page: Page) {
		this.page = page;

		this.elements = [
			{
				title: "Heading",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Update post" }),
			},
			{
				title: "Title field",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Title:" }),
			},
			{
				title: "Description field",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Description:" }),
			},
			{
				title: "Confirm button",
				locator: (page: Page): Locator =>
					page.getByRole("button", { name: "Сonfirm" }),
			},
		];
	}

	async goToPostsPage() {
		await this.page.goto(
			"https://crud-app-qeja.onrender.com/posts?page=1&limit=10",
		);
	}

	async checkVisibilityElements() {
		for (const { title, locator } of this.elements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}

	async updatePost(title: string, description: string) {
		await this.page.getByRole("textbox", { name: "title" }).clear();
		await this.page.getByRole("textbox", { name: "title" }).fill(title);

		await this.page.getByRole("textbox", { name: "description" }).clear();
		await this.page
			.getByRole("textbox", { name: "description" })
			.fill(description);

		await test.step("press confirm", async () => {
			await this.page.getByRole("button", { name: "Сonfirm" }).click();
		});
	}
}
