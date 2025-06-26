import { test, expect, Page, Locator } from "@playwright/test";

interface INavElement {
	title: string;
	locator: (page: Page) => Locator;
	attribute: {
		type: string;
		value: string;
	};
}

interface ICookieAlertElement {
	title: string;
	locator: (page: Page) => Locator;
}

export default class MainPage {
	readonly navElements: INavElement[];
	readonly cookieAlertElements: ICookieAlertElement[];

	constructor(readonly page: Page) {
		this.page = page;
		this.navElements = [
			{
				title: "Home",
				locator: (page: Page): Locator =>
					page.getByRole("link", { name: "Home" }),
				attribute: {
					type: "href",
					value: "/",
				},
			},
			{
				title: "About Us",
				locator: (page: Page): Locator =>
					page.getByRole("link", { name: "About Us" }),
				attribute: {
					type: "href",
					value: "/about",
				},
			},
		];
		this.cookieAlertElements = [
			{
				title: "Heading",
				locator: (page: Page): Locator =>
					page.getByRole("heading", { name: "Welcome!" }),
			},
			{
				title: "Text Content",
				locator: (page: Page): Locator =>
					page.getByText("Our platform uses cookies to"),
			},
			{
				title: "Button",
				locator: (page: Page): Locator =>
					page.getByRole("button", { name: "Accept" }),
			},
		];
	}

	async openMainPage() {
		await this.page.goto("https://crud-app-qeja.onrender.com/");
	}

	async checkNuvLinks() {
		for (const { title, locator, attribute } of this.navElements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});

			await test.step(`${title}: check text content`, async () => {
				await expect.soft(locator(this.page)).toContainText(title);
			});

			await test.step(`${title}: check href attribute`, async () => {
				await expect
					.soft(locator(this.page))
					.toHaveAttribute(attribute.type, attribute.value);
			});
		}
	}

	async checkCookieAlertElements() {
		for (const { title, locator } of this.cookieAlertElements) {
			await test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(this.page)).toBeVisible();
			});
		}
	}

	async clickAcceptCookie() {
		await this.page.getByRole("button", { name: "Accept" }).click();
	}

	async clickSwitchMode() {
		await this.page.getByRole("img").click();
	}

	async checkScreenshot(screenshot: string) {
		await expect.soft(this.page).toHaveScreenshot(screenshot);
	}
}
