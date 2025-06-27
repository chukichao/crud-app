import { expect, test } from "../../../fixtures/postsPage";

const newPost = {
	title: "post title",
	description: "post description",
};

test.describe("Add Post: Process", () => {
	test.beforeEach(async ({ postsPage }) => {
		await postsPage.clickAddPost();
	});

	test("visibility of add form elements", async ({ postsPage }) => {
		await postsPage.checkFormAddPostElements();
	});

	test("checking the add button", async ({ page }) => {
		await test.step("check if add button is unavailable", async () => {
			await expect
				.soft(page.getByRole("button", { name: "Сonfirm" }))
				.toBeDisabled();
		});

		await test.step("filling in form fields", async () => {
			await page.getByRole("textbox", { name: "title" }).fill("123");
			await page.getByRole("textbox", { name: "description" }).fill("123");
		});

		await test.step("check availability of add button", async () => {
			await expect
				.soft(page.getByRole("button", { name: "Сonfirm" }))
				.not.toBeDisabled();
		});
	});

	test("add new post", async ({ page }) => {
		await test.step("filling in form fields", async () => {
			await page.getByRole("textbox", { name: "title" }).fill(newPost.title);
			await page
				.getByRole("textbox", { name: "description" })
				.fill(newPost.description);
		});

		await test.step("press confirm", async () => {
			await page.getByRole("button", { name: "Сonfirm" }).click();
		});

		await test.step("operation check", async () => {
			await expect
				.soft(
					page
						.getByRole("listitem")
						.filter({ hasText: newPost.title })
						.filter({ hasText: newPost.description }),
				)
				.toBeVisible();
		});
	});
});
