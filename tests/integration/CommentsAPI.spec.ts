import { expect, test } from "@playwright/test";

export interface IComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

test("comments", async ({ request }) => {
	const data = {
		postId: 1,
		id: 1,
		name: "id labore ex et quam laborum",
		email: "Eliseo@gardner.biz",
		body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
	};

	const postId = 1;

	const response = await request.get(
		`https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
	);

	expect(response.status()).toBe(200);

	const responseData: IComment[] = await response.json();

	const commentId = 1;
	const comment = responseData.find((post) => post.id === commentId);

	expect(comment).toMatchObject(expect.objectContaining(data));
});
