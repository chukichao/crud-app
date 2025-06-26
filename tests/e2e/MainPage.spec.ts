import { expect, test } from "@playwright/test";
import MainPage from "../models/MainPage";

const screenshots = {
	lightMode: "page-light-mode.png",
	darkMode: "page-dark-mode.png",
};

let mainPage: MainPage;

test.describe("Main Page Tests", () => {
	test.beforeEach(async ({ page }) => {
		mainPage = new MainPage(page);
		await mainPage.openMainPage();
	});

	test("correct data page", async ({ page }) => {
		await test.step("check page title", async () => {
			await expect.soft(page).toHaveTitle(/Vue 3/);
		});

		await test.step("check page language", async () => {
			await expect.soft(page.locator("html")).toHaveAttribute("lang", "en");
		});
	});

	test("visibility of the main blocks of the page", async ({ page }) => {
		await test.step("check header", async () => {
			await expect
				.soft(page.getByText("crudApp_HomeAbout UsSign"))
				.toBeVisible();
		});

		await test.step("check footer", async () => {
			await expect.soft(page.getByRole("contentinfo")).toBeVisible();
		});
	});

	test("navigation links (header)", async ({ page }) => {
		await mainPage.checkNuvLinks();

		await test.step("check posts link (available to authorized users)", async () => {
			await expect
				.soft(page.getByRole("link", { name: "Posts" }))
				.not.toBeVisible();
		});
	});

	test("cookie notification", async ({ page }) => {
		await mainPage.checkCookieAlertElements();

		await test.step(`accept cookie`, async () => {
			await mainPage.clickAcceptCookie();
		});

		await test.step(`check hidden notification`, async () => {
			await expect
				.soft(page.getByText("Welcome! Our platform uses"))
				.not.toBeVisible();
		});
	});

	test("theme page (default: light)", async () => {
		await test.step(`switch dark mode`, async () => {
			await mainPage.clickSwitchMode();
		});

		await test.step(`check screenshot (dark mode)`, async () => {
			await mainPage.checkScreenshot(screenshots.darkMode);
		});

		await test.step(`switch light mode`, async () => {
			await mainPage.clickSwitchMode();
		});

		await test.step(`check screenshot (ligth mode)`, async () => {
			await mainPage.checkScreenshot(screenshots.lightMode);
		});
	});
});
