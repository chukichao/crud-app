<template>
	<div>
		<h2>Update post</h2>

		<form class="form" @submit.prevent="updatePost">
			<div>
				<h3>Title:</h3>
				<textarea v-model.trim="post.title" v-focus placeholder="title" />
			</div>

			<div>
				<h3>Description:</h3>
				<textarea v-model.trim="post.body" placeholder="description" />
			</div>

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

import vFocus from "../directives/VFocus.ts";

import { computed, onMounted, reactive } from "vue";

const postsStore = usePostsStore();
const uiStore = useUIStore();

const props = defineProps<{ title: string; body: string; id: number }>();

const post = reactive({ title: "", body: "" });

const updatePost = () => {
	if (!post.title || !post.body) {
		return;
	}

	postsStore.updatePost(props.id, post);

	uiStore.closeModal();
};

const disabledButton = computed(() => {
	if (post.title !== props.title || post.body !== props.body) {
		return false;
	}

	return true;
});

onMounted(() => {
	post.title = props.title;
	post.body = props.body;
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { usePostsStore } from "../store/posts.ts";
import { useUIStore } from "../store/ui.ts";

import VFocus from "../directives/VFocus.ts";

export default {
	props: {
		title: String,
		body: String,
		id: Number,
	},

	data() {
		return {
			post: {
				title: "",
				body: "",
			},
		};
	},

	methods: {
		updatePost() {
			if (!this.post.title || !this.post.body) {
				return;
			}

			this.postsStore.updatePost(this.id, this.post);

			this.post = {
				title: "",
				body: "",
			};

			this.uiStore.closeModal();
		},
	},

	computed: {
		...mapStores(usePostsStore, useUIStore),
		disabledButton() {
			if (this.post.title !== this.title || this.post.body !== this.body) {
				return false;
			}

			return true;
		},
	},

	mounted() {
		this.post.title = this.title;
		this.post.body = this.body;
	},

	directives: {
		focus: VFocus,
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
	justify-content: center;

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
	}
}

.active-button {
	&:hover {
		background: bisque;
	}
}
</style>
