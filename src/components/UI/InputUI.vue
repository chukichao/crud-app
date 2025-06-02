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
  margin: 0.5rem 0;
  padding: 0.5rem;

  outline: none;

  cursor: pointer;
}
</style>
