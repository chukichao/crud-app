<template>
	<ul>
		<li @click="prevPage">{{ "<" }}</li>
		<li
			v-for="currentPage in postsStore.totalPages"
			:key="currentPage"
			:class="{
				active: postsStore.page === currentPage,
				visible:
					postsStore.page < currentPage - 2 ||
					postsStore.page > currentPage + 2,
			}"
			@click="setPage(currentPage)"
		>
			{{ currentPage }}
		</li>
		<li @click="nextPage">{{ ">" }}</li>
	</ul>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { usePostsStore } from "../store/PostsStore.ts";

import { useRouter } from "vue-router";

const postsStore = usePostsStore();

const router = useRouter();

const updateQuery = () => {
	router.replace({
		query: {
			page: postsStore.page,
			limit: postsStore.limit,
		},
	});
};

const setPage = (currentPage: number) => {
	postsStore.setPage(currentPage);

	updateQuery();
};

const prevPage = () => {
	postsStore.prevPage();

	updateQuery();
};

const nextPage = () => {
	postsStore.nextPage();

	updateQuery();
};
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { usePostsStore } from "../store/PostsStore.ts";

export default {
	methods: {
		updateQuery() {
			this.$router.replace({
				query: {
					page: this.postsStore.page,
					limit: this.postsStore.limit,
				},
			});
		},
		setPage(currentPage) {
			this.postsStore.setPage(currentPage);
			this.updateQuery();
		},
		prevPage() {
			this.postsStore.prevPage();
			this.updateQuery();
		},
		nextPage() {
			this.postsStore.nextPage();
			this.updateQuery();
		},
	},

	computed: {
		...mapStores(usePostsStore),
	},
};
</script> -->

<style scoped lang="scss">
ul {
	display: flex;
	flex-wrap: wrap;

	margin: 3rem auto;

	list-style: none;

	li {
		padding: 1.5rem;

		border: 1px solid #333;

		&:hover {
			color: white;

			background-color: black;
			cursor: pointer;
		}
	}

	.active {
		color: white;

		background-color: black;
	}

	.visible {
		display: none;
	}
}

@media screen and (max-width: 600px) {
	ul {
		li {
			padding: 0.5rem;
		}
	}
}
</style>
