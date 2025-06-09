<template>
	<button>
		<slot />
	</button>
</template>

<script lang="ts">
export default {
	name: "ButtonUI",
};
</script>

<style scoped lang="scss">
button {
	padding: 0.5rem 1rem;

	background: none;

	cursor: pointer;
}
</style>
