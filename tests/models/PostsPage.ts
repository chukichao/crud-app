import { test, expect, Page, Locator } from "@playwright/test";

interface IElement {
	title: string;
	locator: (page: Page) => Locator;
}

export default class PostsPage {
	readonly postsPageElements: IElement[];
	readonly formAddPostElements: IElement[];
	readonly formUpdatePostElements: IElement[];

	constructor(readonly page: Page) {
		this.page = page;

		this.postsPageElements = [
			{
				title: "Heading",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Posts Page" }),
			},
			{
				title: "Search",
				locator: (page: Page): Locator =>
					page.getByRole("searchbox", { name: "search" }),
			},
			{
				title: "Pagination: left",
				locator: (page: Page): Locator => page.getByText("<"),
			},
			{
				title: "Pagination: right",
				locator: (page: Page): Locator => page.getByText(">"),
			},
			{
				title: "Posts list",
				locator: (page: Page): Locator => page.getByText("Post list(shown 10)"),
			},
			{
				title: "Add button",
				locator: (page: Page): Locator =>
					page.getByRole("button", { name: "Add new post" }),
			},
			{
				title: "Limit filter",
				locator: (page: Page): Locator => page.getByRole("combobox").first(),
			},
			{
				title: "Sort filter",
				locator: (page: Page): Locator => page.getByRole("combobox").nth(1),
			},
		];

		this.formAddPostElements = [
			{
				title: "Heading",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Create post" }),
			},
			{
				title: "Title field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "title" }),
			},
			{
				title: "Description field",
				locator: (page: Page): Locator =>
					page.getByRole("textbox", { name: "description" }),
			},
			{
				title: "Confirm button",
				locator: (page: Page): Locator =>
					page.getByRole("button", { name: "Сonfirm" }),
			},
		];

		this.formUpdatePostElements = [
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

	async openPostsPage() {
		await this.page.goto(
			"https://crud-app-qeja.onrender.com/posts?page=1&limit=10",
		);
	}

	async checkPostsPageElements() {
		for (const { title, locator } of this.postsPageElements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}

	async checkFormAddPostElements() {
		for (const { title, locator } of this.formAddPostElements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}

	async checkFormUpdatePostElements() {
		for (const { title, locator } of this.formUpdatePostElements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}

	async addNewPost(title: string, description: string) {
		await this.page.getByRole("button", { name: "Add new post" }).click();

		await this.page.getByRole("textbox", { name: "title" }).fill(title);
		await this.page
			.getByRole("textbox", { name: "description" })
			.fill(description);

		await this.page.getByRole("button", { name: "Сonfirm" }).click();
	}

	async clickAddPost() {
		await this.page.getByRole("button", { name: "Add new post" }).click();
	}

	// async clickEditPost() {
	// 	await this.page
	// 		.getByRole("listitem")
	// 		.filter({ hasText: "× 101. post titlepost" })
	// 		.getByRole("button")
	// 		.nth(1)
	// 		.click();
	// }

	// async clickRemovePost() {
	// 	await this.page
	// 		.getByRole("listitem")
	// 		.filter({ hasText: "post title" })
	// 		.getByRole("button")
	// 		.first()
	// 		.click();
	// }
}
