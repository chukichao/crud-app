<template>
  <select
    :value="modelValue"
    @change="this.$emit('update:modelValue', $event.target.value)"
  >
    <option value="" disabled>{{ title }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.title }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'SelectUI',

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
</script>
