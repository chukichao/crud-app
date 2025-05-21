<template>
  <div class="posts">
    <div v-if="posts.length > 0" class="post-list">
      <h2>{{ title }}</h2>

      <TransitionGroup name="list" tag="ul">
        <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post.id)"
          @update="(id, updatePost) => $emit('update', id, updatePost)"
        >
        </PostItem>
      </TransitionGroup>
    </div>

    <!-- v-else-if="" // дополнительное условие -->

    <div v-else class="status">
      <loader-ui v-if="isLoadingPosts" />
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
    isLoadingPosts: {
      type: Boolean,
      required: true,
    },
  },

  inject: ['title'], // получение данных provide -> inject

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

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-130px);
}
</style>
