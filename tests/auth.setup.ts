import { test as setup, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const user = {
	username: "admin",
	password: "admin",
};

setup("authenticate", async ({ page }) => {
	// Perform authentication steps. Replace these actions with your own.
	await page.goto("https://crud-app-qeja.onrender.com/");
	await page.getByRole("button", { name: "Sign in" }).click();

	await page.getByRole("textbox", { name: "username" }).fill(user.username);
	await page.getByRole("textbox", { name: "password" }).fill(user.password);
	await page.locator("form").getByRole("button", { name: "Sign in" }).click();
	// Wait until the page receives the cookies.
	//
	// Sometimes login flow sets cookies in the process of several redirects.
	await page.getByRole("link", { name: "About Us" }).click();
	await page.getByRole("link", { name: "Posts" }).click();

	// Alternatively, you can wait until the page reaches a state where all cookies are set.
	await expect(page.getByText(user.username)).toBeVisible();

	// End of authentication steps.

	await page.context().storageState({ path: authFile });
});
