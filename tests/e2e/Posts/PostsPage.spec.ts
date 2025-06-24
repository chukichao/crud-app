import { expect, test } from "@playwright/test";

test.describe("PostsPage", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:8000/");
		await page.getByRole("button", { name: "Sign in" }).click();

		const user = {
			username: "admin",
			password: "admin",
		};

		// username
		await page.getByRole("textbox", { name: "username" }).fill(user.username);
		// password
		await page.getByRole("textbox", { name: "password" }).fill(user.password);
		// submit
		await page.locator("form").getByRole("button", { name: "Sign in" }).click();

		await page.getByRole("link", { name: "Posts" }).click();
	});

	test("visibility of elements", async ({ page }) => {
		// title
		await expect(
			page.getByRole("heading", { name: "Posts Page" }),
		).toBeVisible();

		// search
		await expect(page.getByRole("searchbox", { name: "search" })).toBeVisible();

		// pagination
		await expect(page.getByText("1", { exact: true })).toBeVisible();
		await expect(page.getByText("2", { exact: true })).toBeVisible();
		await expect(page.getByText("3", { exact: true })).toBeVisible();
		await expect(page.getByText(">")).toBeVisible();

		// posts list
		await expect(page.getByText("Post list(shown 10)")).toBeVisible();

		// button for add new post
		await expect(
			page.getByRole("button", { name: "Add new post" }),
		).toBeVisible();

		// filters
		await expect(page.getByRole("combobox").first()).toBeVisible();
		await expect(page.getByRole("combobox").nth(1)).toBeVisible();
	});
});
