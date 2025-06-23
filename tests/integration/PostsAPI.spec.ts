import { expect, test } from "@playwright/test";

export interface IPost {
	id: number;
	title: string;
	body: string;
	userId?: number;
}

test("posts", async ({ request }) => {
	const data = {
		userId: 1,
		id: 1,
		title:
			"sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
	};

	const postId = 1;

	const response = await request.get(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
	);

	expect(response.status()).toBe(200);

	const responseData: IPost[] = await response.json();

	expect(responseData).toMatchObject(expect.objectContaining(data));
});
