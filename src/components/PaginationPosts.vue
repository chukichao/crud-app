<template>
  <ul>
    <li @click="postsStore.prevPage">{{ '<' }}</li>
    <li
      v-for="currentPage in postsStore.totalPages"
      :key="currentPage"
      @click="postsStore.setPage(currentPage)"
      :class="{
        active: postsStore.page === currentPage,
        visible:
          postsStore.page < currentPage - 2 ||
          postsStore.page > currentPage + 2,
      }"
    >
      {{ currentPage }}
    </li>
    <li @click="postsStore.nextPage">{{ '>' }}</li>
  </ul>
</template>

<script>
import { mapStores } from 'pinia';
import { usePostsStore } from '../store/PostsStore.js';

export default {
  computed: {
    ...mapStores(usePostsStore),
  },
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;

  margin: 3rem auto;

  list-style: none;

  li {
    padding: 1.5rem;
    border: 1px solid #333;

    &:hover {
      cursor: pointer;
      color: white;
      background-color: black;
    }
  }

  .active {
    color: white;
    background-color: black;
  }

  .visible {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  ul {
    li {
      padding: 0.5rem;
    }
  }
}
</style>
