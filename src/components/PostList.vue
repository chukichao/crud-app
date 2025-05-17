<template>
  <div class="posts">
    <div v-if="posts.length > 0" class="post-list">
      <h2>{{ title }}</h2>
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post.id)"
        @update="(id, updatePost) => $emit('update', id, updatePost)"
      />
    </div>

    <!-- v-else-if="" // дополнительное условие -->

    <div v-else class="status">
      <loader-ui v-if="loader" />
      <h2 v-else>No posts</h2>
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  props: {
    posts: {
      type: Array,
      required: true,
      // default: ...

      validator(value) {
        return true;
        // валидация полученного пропса (с возвращаемым булевым значением; при необходимости)
        // return ['...', '...', '...'].includes(value);
      },
    },
    loader: {
      type: Boolean,
      required: true,
    },
  },

  inject: ['title'], // provide -> inject

  components: {
    PostItem,
  },
};
</script>

<style scoped lang="scss">
.post-list,
.status {
  text-align: center;

  h2 {
    padding: 1.5rem;
    font-size: 30px;
  }
}
</style>
