<template>
  <select :value="modelValue" @change="updateValue">
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
    },
    title: {
      type: String,
    },
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
