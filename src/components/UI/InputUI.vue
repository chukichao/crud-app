<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
  />
</template>

<script>
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
</script>

<style scoped lang="scss">
input {
  padding: 0.5rem;
  margin: 0.5rem 0;

  outline: none;

  cursor: pointer;
}
</style>
