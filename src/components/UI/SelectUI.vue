<template>
  <select :selected="defaultValue" :value="modelValue" @change="updateInput">
    <option value="" disabled>{{ title }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.title }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'select-ui',

  props: {
    modelValue: {
      type: [String, Number],
    },
    options: {
      type: Array,
      default: () => [],
    },
    defaultValue: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
