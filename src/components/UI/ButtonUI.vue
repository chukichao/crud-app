<template>
	<button :class="{ [`${uiStore.theme}-theme`]: true }">
		<slot />
	</button>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { useUIStore } from "../../store/ui";

export default {
	name: "ButtonUI",
	computed: {
		...mapStores(useUIStore),
	},
};
</script>

<style scoped lang="scss">
button {
	padding: 0.5rem 1rem;

	background: none;

	cursor: pointer;
}

.dark-theme {
	color: white;

	background-color: black;
}

.light-theme {
	color: black;

	background-color: white;
}
</style>
