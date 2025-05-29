<template>
  <select v-model="limit" @change="postsStore.setLimit($event.target.value)">
    <option value="" disabled>limit</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.title }}
    </option>
  </select>
</template>

<!-- COMPOSITION API -->

<script setup>
import { usePostsStore } from '../store/PostsStore.js';

import { ref } from 'vue';

const postsStore = usePostsStore();

const limit = ref('');
const options = ref([
  { title: 5, value: 5 },
  { title: 10, value: 10 },
  { title: 25, value: 25 },
  { title: 'all', value: 100 },
]);
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from 'pinia';
import { usePostsStore } from '../store/PostsStore.js';

export default {
  data() {
    return {
      limit: '',
      options: [
        { title: 5, value: 5 },
        { title: 10, value: 10 },
        { title: 25, value: 25 },
        { title: 'all', value: 100 },
      ],
    };
  },

  methods: {
    updateValue(event) {
      this.postsStore.setLimit(event.target.value);
    },
  },

  computed: {
    ...mapStores(usePostsStore),
  },
};
</script> -->
