<template>
	<main>
		<h1 id="heading">Comments Page</h1>

		<div class="comments-list">
			<div v-if="commentsStore.comments.length" class="comments-item">
				<ul>
					<li v-for="comment in commentsStore.comments" :key="comment.id">
						<h3>{{ comment.id }}. {{ comment.name }}</h3>
						<p>{{ comment.body }}</p>
						<p>{{ comment.email }}</p>
					</li>
				</ul>
			</div>

			<div v-else>
				<LoaderUI v-if="uiStore.isLoading" />
				<h2 v-else>No comments yet</h2>
			</div>

			<ButtonUI
				@click="
					$router.push(
						`/posts?page=${postsStore.page}&limit=${postsStore.limit}`,
					)
				"
				>Back</ButtonUI
			>
		</div>
	</main>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { usePostsStore } from "../store/posts.ts";
import { useUIStore } from "../store/ui.ts";
import { useCommentsStore } from "../store/сomments.ts";

import { onMounted } from "vue";

import { useRoute } from "vue-router";

const commentsStore = useCommentsStore();
const uiStore = useUIStore();
const postsStore = usePostsStore();

const route = useRoute();

const scrollToUp = () => {
	const heading = document.getElementById("heading");

	if (heading) {
		heading.scrollIntoView();
	}
};

onMounted(() => {
	commentsStore.fetchComments(route.params.id as string);
	scrollToUp();
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { useCommentsStore } from "../store/сomments.ts";
import { useUIStore } from "../store/ui.ts";
import { usePostsStore } from "../store/posts.ts";

export default {
	methods: {
		scrollToUp() {
			document.getElementById("heading").scrollIntoView();
		},
	},

	computed: {
		...mapStores(useCommentsStore, useUIStore, usePostsStore),
	},

	mounted() {
		this.commentsStore.fetchComments(this.$route.params.id);
		this.scrollToUp();
	},
};
</script> -->

<style scoped lang="scss">
.comments-list {
	text-align: center;

	h2 {
		padding: 1.5rem;

		font-size: 30px;
	}

	button {
		align-self: flex-end;

		margin: 1rem;

		&:hover {
			color: black !important;

			background-color: bisque;
		}
	}
}

.comments-item {
	display: flex;
	flex-direction: column;
	justify-content: center;

	ul {
		list-style: none;

		li {
			margin: 2rem 0;
		}

		p {
			padding: 1rem;
		}
	}
}
</style>
