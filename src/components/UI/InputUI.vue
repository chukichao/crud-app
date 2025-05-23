<template>
  <input :value="modelValue" @input="updateValue" ref="input" />
</template>

<script>
export default {
  name: 'input-ui',

  props: {
    modelValue: [String, Number],
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
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
