<template>
  <input
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    ref="input"
  />
</template>

<script lang="ts">
export default {
  name: 'InputUI',
};
</script>

<!-- COMPOSITION API -->

<script setup lang="ts">
defineProps<{
  modelValue: string | number | null;
}>();
</script>

<!-- OPTIONS API -->

<!-- <script>
export default {
  name: 'InputUI',

  props: {
    modelValue: [String, Number],
  },

  methods: {
    getInputRef() {
      return this.$refs.input;
    },
  },
};
</script> -->

<style scoped lang="scss">
input {
  margin: 0.5rem 0;
  padding: 0.5rem;

  outline: none;

  cursor: pointer;
}
</style>
