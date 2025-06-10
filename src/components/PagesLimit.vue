<template>
	<select v-model="limit" @change="setLimit">
		<option value="" disabled>limit</option>
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.title }}
		</option>
	</select>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { usePostsStore } from "../store/posts.ts";

import { ref, reactive } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const postsStore = usePostsStore();

const limit = ref("");
const options = reactive([
	{ title: 5, value: 5 },
	{ title: 10, value: 10 },
	{ title: 25, value: 25 },
	{ title: "all", value: 100 },
]);

const updateQuery = () => {
	router.replace({
		query: {
			page: postsStore.page,
			limit: postsStore.limit,
		},
	});
};

const setLimit = (event: Event) => {
	postsStore.setLimit(Number((event.target as HTMLSelectElement).value));

	updateQuery();
};
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { usePostsStore } from "../store/posts.ts";

export default {
	data() {
		return {
			limit: "",
			options: [
				{ title: 5, value: 5 },
				{ title: 10, value: 10 },
				{ title: 25, value: 25 },
				{ title: "all", value: 100 },
			],
		};
	},

	methods: {
		updateQuery() {
			this.$router.replace({
				query: {
					page: this.postsStore.page,
					limit: this.postsStore.limit,
				},
			});
		},
		setLimit(event) {
			this.postsStore.setLimit(Number(event.target.value));

			this.updateQuery();
		},
	},

	computed: {
		...mapStores(usePostsStore),
	},
};
</script> -->
