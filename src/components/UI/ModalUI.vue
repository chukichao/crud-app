<template>
	<div class="modal" @click="uiStore.closeModal">
		<div class="modal-body" @click.stop>
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "ModalUI",
};
</script>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { useUIStore } from "../../store/ui.ts";

const uiStore = useUIStore();
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";
import { useUIStore } from "../../store/ui.ts";

export default {
	name: "ModalUI",

	computed: {
		...mapStores(useUIStore),
	},
};
</script> -->

<style scoped lang="scss">
.modal {
	position: fixed;
	inset: 0;

	display: flex;

	text-align: center;

	background: rgb(0 0 0 / 50%);

	&-body {
		min-width: 300px;
		min-height: 50px;

		margin: auto;
		padding: 3rem 6rem;

		background-color: white;
		border: 1px solid #333;
		border-radius: 10px;
	}
}
</style>
