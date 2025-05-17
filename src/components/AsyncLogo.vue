<template>
  <span>{{ logo }}</span>
  <!-- с использованием миксинов -->
</template>

<script>
import { logoMixin } from '../main.js';

export default {
  mixins: [logoMixin],
  components: {
    logoMixin,
  },
};
</script>
