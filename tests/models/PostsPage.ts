import { test, expect, Page, Locator } from "@playwright/test";

interface IElement {
	title: string;
	locator: (page: Page) => Locator;
}

export default class PostsPage {
	readonly elements: IElement[];

	constructor(readonly page: Page) {
		this.page = page;

		this.elements = [
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
	}

	async clickAddNewPost() {
		await this.page.getByRole("button", { name: "Add new post" }).click();
	}

	async clickEditPost() {
		await this.page
			.getByRole("listitem")
			.filter({ hasText: "× 101. post titlepost" })
			.getByRole("button")
			.nth(1)
			.click();
	}

	async clickRemovePost() {
		await this.page
			.getByRole("listitem")
			.filter({ hasText: "post title" })
			.getByRole("button")
			.first()
			.click();
	}

	async openPostsPage() {
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
}
