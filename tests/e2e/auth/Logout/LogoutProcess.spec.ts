import { expect, test } from "@playwright/test";

test.describe("Logout: Process", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://crud-app-qeja.onrender.com/");
		await page.getByRole("button", { name: "Logout" }).click();
	});

	test("visibility of logout elements", async ({ page }) => {
		await test.step("check heading", async () => {
			await expect
				.soft(page.getByRole("heading", { name: "Are you sure?" }))
				.toBeVisible();
		});

		await test.step("check buttons", async () => {
			await expect
				.soft(page.getByRole("button", { name: "Yes" }))
				.toBeVisible();
			await expect.soft(page.getByRole("button", { name: "No" })).toBeVisible();
		});
	});

	test("action cancel", async ({ page }) => {
		await test.step("press no", async () => {
			await page.getByRole("button", { name: "No" }).click();
		});

		await test.step("operation check", async () => {
			await expect.soft(page.getByText("admin")).toBeVisible();
		});
	});

	test("action confirm", async ({ page }) => {
		await test.step("press yes", async () => {
			await page.getByRole("button", { name: "Yes" }).click();
		});

		await test.step("operation check", async () => {
			await expect.soft(page.getByText("admin")).not.toBeVisible();
		});
	});
});
