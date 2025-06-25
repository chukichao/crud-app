<template>
	<li>
		<div class="post-item" @click="$router.push(`/posts/${post.id}`)">
			<ButtonUI
				class="post-item-delete"
				@click.stop="postsStore.removePost(post.id)"
			>
				&times;
			</ButtonUI>

			<div class="post-item-content">
				<div class="post-item-content-body">
					<h3>{{ post.id }}. {{ post.title }}</h3>
					<p>{{ post.body }}</p>
				</div>
				<div class="post-item-content-edit">
					<ButtonUI @click.stop="uiStore.openModal('editPost', post.id)">
						Edit
					</ButtonUI>
				</div>
			</div>
		</div>

		<ModalUI v-if="uiStore.modal.extra === post.id">
			<FormUpdatePost :id="post.id" :title="post.title" :body="post.body" />
		</ModalUI>
	</li>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import FormUpdatePost from "./FormUpdatePost.vue";

import { usePostsStore } from "../store/posts.ts";
import { useUIStore } from "../store/ui.ts";

import type { IPost } from "../types/post.ts";

const postsStore = usePostsStore();
const uiStore = useUIStore();

defineProps<{
	post: IPost;
}>();
</script>

<!-- OPTIONS API -->

<!-- <script>
import FormUpdatePost from "./FormUpdatePost.vue";

import { mapStores } from "pinia";
import { usePostsStore } from "../store/posts.ts";
import { useUIStore } from "../store/ui.ts";

export default {
	props: {
		post: Object,
	},

	computed: {
		...mapStores(usePostsStore, useUIStore),
	},

	components: {
		FormUpdatePost,
	},
};
</script> -->

<style scoped lang="scss">
.post-item {
	display: flex;
	flex-direction: column;

	margin-top: 1rem;

	padding: 0 0 2rem 2rem;

	border: 2px solid #333;

	cursor: pointer;

	&:hover {
		box-shadow: 5px 5px 5px #333;
	}

	&-delete {
		align-self: end;

		border: none;

		&:hover {
			color: white;

			background-color: #333;
		}
	}

	&-content {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-top: 2rem;

		&-body {
			p {
				margin: 1rem 0;
				padding: 0.5rem;

				text-indent: 0.5rem;
			}
		}

		&-edit {
			margin: 1rem;

			button:hover {
				color: black !important;

				background: bisque;
			}
		}
	}
}
</style>
