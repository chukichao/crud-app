<template>
  <div class="posts-list">
    <div v-if="posts.length">
      <h2>Post list ({{ postsStore.totalCountPosts }})</h2>

      <TransitionGroup name="list" tag="ul">
        <PostItem v-for="post in posts" :key="post.id" :post="post" />
      </TransitionGroup>
    </div>

    <div v-else>
      <loader-ui v-if="uiStore.isLoading" />
      <h2 v-else>No posts</h2>
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

import { mapStores } from 'pinia';
import { usePostsStore } from '../store/PostsStore.js';
import { useUIStore } from '../store/UIStore.js';

export default {
  props: {
    posts: Array,
  },

  computed: {
    ...mapStores(usePostsStore, useUIStore),
  },

  components: {
    PostItem,
  },
};
</script>

<style scoped lang="scss">
.posts-list {
  text-align: center;

  h2 {
    padding: 1.5rem;
    font-size: 30px;
  }

  ul {
    list-style: none;
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
