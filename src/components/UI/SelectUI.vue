<template>
	<select
		:value="modelValue"
		@change="
			$emit('update:modelValue', ($event.target as HTMLSelectElement).value)
		"
	>
		<option value="" disabled>{{ title }}</option>
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.title }}
		</option>
	</select>
</template>

<script lang="ts">
export default {
	name: "SelectUI",
};
</script>

<!-- COMPOSITION API -->

<script setup lang="ts">
interface IOption {
	title: string;
	value: string;
}

defineProps<{
	modelValue: string | number | null;
	options: IOption[];
	title?: string;
}>();
</script>

<!-- OPTIONS API -->

<!-- <script>
export default {
	name: "SelectUI",

	props: {
		modelValue: {
			type: [String, Number],
		},
		options: {
			type: Array,
		},
		title: {
			type: String,
		},
	},
};
</script> -->
