import { expect, test, Page, Locator } from "@playwright/test";

interface INavElement {
	title: string;
	locator: (page: Page) => Locator;
	attribute: {
		type: string;
		value: string;
	};
}

const navElements: INavElement[] = [
	{
		title: "Home",
		locator: (page: Page): Locator => page.getByRole("link", { name: "Home" }),
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

interface ICookieAlertElement {
	title: string;
	locator: (page: Page) => Locator;
}

const cookieAlertElements: ICookieAlertElement[] = [
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

test.describe("Main Page Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/");
	});

	test("correct data page", async ({ page }) => {
		test.step("check page title", async () => {
			await expect.soft(page).toHaveTitle(/Vue 3/);
		});

		test.step("check page language", async () => {
			await expect.soft(page.locator("html")).toHaveAttribute("lang", "en");
		});
	});

	test("visibility of the main blocks of the page", async ({ page }) => {
		test.step("check header", async () => {
			await expect
				.soft(page.getByText("crudApp_HomeAbout UsSign"))
				.toBeVisible();
		});

		test.step("check footer", async () => {
			await expect.soft(page.getByRole("contentinfo")).toBeVisible();
		});
	});

	test("navigation links (header)", async ({ page }) => {
		navElements.forEach(({ title, locator, attribute }) => {
			test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(page)).toBeVisible();
			});

			test.step(`${title}: check text content`, async () => {
				await expect.soft(locator(page)).toContainText(title);
			});

			test.step(`${title}: check href attribute`, async () => {
				await expect
					.soft(locator(page))
					.toHaveAttribute(attribute.type, attribute.value);
			});
		});

		test.step("check posts link (available to authorized users)", async () => {
			await expect
				.soft(page.getByRole("link", { name: "Posts" }))
				.not.toBeVisible();
		});
	});

	test("cookie notification", async ({ page }) => {
		cookieAlertElements.forEach(({ title, locator }) => {
			test.step(`${title}: check visibility`, async () => {
				await expect.soft(locator(page)).toBeVisible();
			});
		});

		await page.getByRole("button", { name: "Accept" }).click();

		test.step(`check hidden notification`, async () => {
			await expect
				.soft(page.getByText("Welcome! Our platform uses"))
				.not.toBeVisible();
		});
	});
});
