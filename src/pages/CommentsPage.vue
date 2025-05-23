<template>
  <h1>Comments Page</h1>

  <div v-if="commentsStore.comments.length" class="comments">
    <ul>
      <li v-for="comment in commentsStore.comments" :key="comment.id">
        <h3>{{ comment.id }}. {{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
        <p>{{ comment.email }}</p>
      </li>
    </ul>
    <button-ui @click="$router.push('/posts')">Back</button-ui>
  </div>

  <div v-else class="status">
    <loader-ui v-if="uiStore.isLoading" />
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useCommentsStore } from '../store/CommentsStore';
import { useUIStore } from '../store/UIStore';

export default {
  mounted() {
    this.commentsStore.fetchComments(this.$route.params.id);
  },

  computed: {
    ...mapStores(useCommentsStore, useUIStore),
  },
};
</script>

<style scoped lang="scss">
.comments {
  display: flex;
  flex-direction: column;

  ul {
    list-style: none;

    li {
      margin: 2rem 0;
    }

    p {
      padding: 1rem;
    }
  }

  button {
    align-self: flex-end;

    margin: 1rem;

    &:hover {
      background: bisque;
    }
  }
}
</style>
