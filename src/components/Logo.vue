<template>
  <div class="logo">crudApp<span v-blink.hover>_</span></div>
</template>

<!-- COMPOSITION API -->

<script setup>
import vBlink from '../directives/VBlink.js';
</script>

<!-- OPTIONS API -->

<!-- <script>
import VBlink from '../directives/VBlink.js';

export default {
  directives: {
    blink: VBlink,
  },
};
</script> -->

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;

  padding: 1.5rem;

  transition: 2s linear;

  &:hover {
    transform: scale(1.1);
    cursor: default;
  }
}
</style>
