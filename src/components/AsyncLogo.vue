<template>
  <div class="logo">Logo<span v-blink.hover>_</span></div>
  <!-- с использованием миксинов -->
</template>

<script>
import VBlink from '../directives/VBlink.js';

export default {
  directives: {
    blink: VBlink,
  },
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.5rem;
  margin-right: 1rem;

  transition: 2s linear;

  &:hover {
    cursor: default;
    transform: scale(1.1);
  }
}
</style>
