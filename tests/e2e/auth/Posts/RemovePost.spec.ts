import { expect, test } from "@playwright/test";

const newPost = {
	title: "post title",
	description: "post description",
};

test.describe("Remove Post", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/posts?page=1&limit=10");
		await page.getByRole("button", { name: "Add new post" }).click();

		// filling in the fields
		await page.getByRole("textbox", { name: "title" }).fill(newPost.title);
		await page
			.getByRole("textbox", { name: "description" })
			.fill(newPost.description);

		// submit
		await page.getByRole("button", { name: "Сonfirm" }).click();

		await page
			.getByRole("listitem")
			.filter({ hasText: "× 101. post titlepost" })
			.getByRole("button")
			.first()
			.click();
	});

	test("remove post", async ({ page }) => {
		// check
		await expect(
			page
				.getByRole("listitem")
				.filter({ hasText: newPost.title })
				.filter({ hasText: newPost.description }),
		).not.toBeVisible();
	});
});
