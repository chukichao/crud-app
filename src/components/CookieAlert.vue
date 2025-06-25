<template>
	<div class="cookie-alert">
		<h3>Welcome!</h3>
		<p>
			Our platform uses cookies to ensure the correct operation of the site and
			your comfortable interaction with it.
		</p>
		<ButtonUI @click="uiStore.closeCookieAlert">Accept</ButtonUI>
	</div>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { useUIStore } from "../store/ui.ts";

const uiStore = useUIStore();
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { useUIStore } from "../store/ui.ts";

export default {
	computed: {
		...mapStores(useUIStore),
	},
};
</script> -->

<style scoped lang="scss">
.cookie-alert {
	position: fixed;
	bottom: 0;
	left: 0;

	width: 400px;

	padding: 1rem 2rem;

	color: black;

	background: bisque;
	border: 2px solid #333;
	border-radius: 5px;

	p {
		margin: 1rem 0;
	}

	button {
		color: black;

		background-color: white;
		border-radius: 5px;
	}
}
</style>
