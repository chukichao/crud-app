<template>
	<div>
		<h2>Create post</h2>
		<form class="form" @submit.prevent="createPost">
			<textarea ref="textarea" v-model.trim="post.title" placeholder="title" />
			<textarea v-model.trim="post.body" placeholder="description" />
			<ButtonUI
				:disabled="disabledButton"
				:class="{ ['active-button']: !disabledButton }"
				>Сonfirm</ButtonUI
			>
		</form>
	</div>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { usePostsStore } from "../store/posts.ts";
import { useUIStore } from "../store/ui.ts";

import { computed, onMounted, reactive, useTemplateRef } from "vue";

const postsStore = usePostsStore();
const uiStore = useUIStore();

const textarea = useTemplateRef<HTMLTextAreaElement>("textarea");

let post = reactive({
	title: "",
	body: "",
});

const createPost = () => {
	if (!post.title || !post.body) {
		return;
	}

	postsStore.createPost(post);
	uiStore.closeModal();

	post = {
		title: "",
		body: "",
	};
};

const disabledButton = computed(() => {
	if (post.title.length >= 3 && post.body.length >= 3) {
		return false;
	}

	return true;
});

onMounted(() => {
	textarea.value?.focus();
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { usePostsStore } from "../store/posts.ts";
import { useUIStore } from "../store/ui.ts";

export default {
	data() {
		return {
			post: {
				title: "",
				body: "",
			},
		};
	},

	methods: {
		createPost() {
			if (!this.post.title || !this.post.body) {
				return;
			}

			this.postsStore.createPost(this.post);
			this.uiStore.closeModal();

			this.post = {
				title: "",
				body: "",
			};
		},
	},

	computed: {
		...mapStores(usePostsStore, useUIStore),
		disabledButton() {
			if (this.post.title.length >= 1 && this.post.body.length >= 1) {
				return false;
			}

			return true;
		},
	},

	mounted() {
		this.$refs.textarea.focus();
	},
};
</script> -->

<style scoped lang="scss">
h2 {
	margin: 1rem 0;

	font-size: 30px;
}

.form {
	display: flex;
	flex-direction: column;

	textarea {
		width: 100%;
		height: 200px;
		margin: 0.5rem auto;

		font-size: 1rem;

		&:focus {
			outline: 1px solid #333;
		}
	}

	button {
		align-self: flex-end;

		margin-top: 1rem;

		box-shadow: 1px 1px 1px #333;

		cursor: default;
	}
}

.active-button {
	&:hover {
		color: black;

		background-color: bisque;

		cursor: pointer;
	}
}
</style>
