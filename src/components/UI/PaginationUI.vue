<template>
  <ul>
    <li
      v-for="currentPage in totalPages"
      :key="currentPage"
      @click="$emit('setPage', currentPage)"
      :class="{ active: page === currentPage }"
    >
      {{ currentPage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination-ui',
  props: {
    totalPages: {
      type: Number,
      default: 1,
    },
    page: Number,
  },
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;

  margin: 3rem auto;

  list-style: none;

  li {
    margin-right: 0.5rem;
    padding: 1rem;

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
}
</style>
