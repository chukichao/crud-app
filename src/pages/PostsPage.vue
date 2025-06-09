<template>
	<h1 id="heading">Posts Page</h1>

	<InputUI
		type="search"
		class="search"
		v-model.trim="searchQuery"
		v-focus
		placeholder="search"
	/>

	<PaginationPosts v-if="searchQuery.length === 0" />

	<PostsList :posts="sortedAndSearchedPosts" />

	<div
		v-if="sortedAndSearchedPosts.length"
		v-observer="postsStore.fetchPosts"
	></div>

	<div class="filter">
		<PagesLimit />
		<SelectUI :options="sortOptions" v-model="selectedSort" title="sort" />
	</div>

	<div class="add">
		<ButtonUI @click="uiStore.openModal('addPost')" title="Add new post"
			>+
		</ButtonUI>
	</div>

	<ModalUI v-if="uiStore.modal.type === 'addPost'">
		<FormAddPost />
	</ModalUI>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import PostsList from "../components/PostsList.vue";
import FormAddPost from "../components/FormAddPost.vue";
import PaginationPosts from "../components/PaginationPosts.vue";
import PagesLimit from "../components/PagesLimit.vue";

import { usePostsStore } from "../store/PostsStore.js";
import { useUIStore } from "../store/UIStore.js";

import { useRoute } from "vue-router";

import vObserver from "../directives/VIntersection.js";
import vFocus from "../directives/VFocus.js";

import { computed, onMounted, ref, reactive, watch } from "vue";

const postsStore = usePostsStore();
const uiStore = useUIStore();

const route = useRoute();

const searchQuery = ref("");
const selectedSort = ref("");
const sortOptions = reactive([
	{ title: "by title", value: "title" },
	{ title: "by body", value: "body" },
]);

const scrollToUp = () => {
	const heading = document.getElementById("heading");

	if (heading) {
		heading.scrollIntoView();
	}
};

const sortedAndSearchedPosts = computed(() => {
	const sortedPosts = [...postsStore.posts].sort((post1, post2) =>
		post1[selectedSort.value as "title" | "body"].localeCompare(
			post2[selectedSort.value as "title" | "body"],
		),
	);

	return sortedPosts.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

watch(selectedSort, () => {
	scrollToUp();
});

onMounted(() => {
	postsStore.fetchPosts();

	const queryLimit = Number(route.query.limit);
	const queryPage = Number(route.query.page);

	if (queryLimit !== postsStore.limit || queryPage !== postsStore.page) {
		postsStore.setLimit(queryLimit, queryPage);
		postsStore.setPage(queryPage);
	}
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import PostsList from "../components/PostsList.vue";
import FormAddPost from "../components/FormAddPost.vue";
import PaginationPosts from "../components/PaginationPosts.vue";
import PagesLimit from "../components/PagesLimit.vue";

import { mapStores } from "pinia";
import { usePostsStore } from "../store/PostsStore.js";
import { useUIStore } from "../store/UIStore.js";

import VIntersection from "../directives/VIntersection.js";
import VFocus from "../directives/VFocus.js";

export default {
	data() {
		return {
			searchQuery: "",
			selectedSort: "",
			sortOptions: [
				{ title: "by title", value: "title" },
				{ title: "by body", value: "body" },
			],
		};
	},

	methods: {
		scrollToUp() {
			document.getElementById("heading").scrollIntoView();
		},
	},

	computed: {
		...mapStores(usePostsStore, useUIStore),

		sortedPosts() {
			return [...this.postsStore.posts].sort((post1, post2) =>
				post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
			);
		},

		sortedAndSearchedPosts() {
			return this.sortedPosts.filter((post) =>
				post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
			);
		},
	},

	watch: {
		selectedSort() {
			this.scrollToUp();
		},
	},

	mounted() {
		this.postsStore.fetchPosts();

		const queryLimit = Number(this.$route.query.limit);
		const queryPage = Number(this.$route.query.page);

		if (
			queryLimit !== this.postsStore.limit ||
			queryPage !== this.postsStore.page
		) {
			this.postsStore.setLimit(queryLimit, queryPage);
			this.postsStore.setPage(queryPage);
		}
	},

	components: {
		PostsList,
		FormAddPost,
		PaginationPosts,
		PagesLimit,
	},

	directives: {
		observer: VIntersection,
		focus: VFocus,
	},
};
</script> -->

<style scoped lang="scss">
.search {
	padding: 1rem;

	font-size: 20px;

	border-radius: 1rem;

	&::placeholder {
		font-style: italic;
	}

	&:focus {
		outline: 2px solid #333;
	}
}

.add {
	position: fixed;
	right: 3rem;
	bottom: 3rem;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 50px;
	height: 50px;

	background-color: bisque;
	border: 1px solid #333;
	border-radius: 50%;

	transition: 1s;

	&:hover {
		transform: scale(1.1);
	}

	button {
		font-size: 20px;

		border: none;
	}
}

.filter {
	position: fixed;
	right: 0;
	bottom: 0;

	select {
		padding: 0.3rem;
	}
}
</style>
