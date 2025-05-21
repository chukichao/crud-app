<template>
  <h1>Comments Page</h1>

  <div v-if="comments.length > 0" class="comments">
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <h3>{{ comment.id }}. {{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
        <p>{{ comment.email }}</p>
      </li>
    </ul>
    <button-ui @click="$router.push('/posts')">Back</button-ui>
  </div>

  <div v-else class="status">
    <loader-ui v-if="isLoadingComments" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: [],
      isLoadingComments: false,
    };
  },

  methods: {
    async fetchPost() {
      try {
        this.isLoadingComments = true;

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}/comments`,
        );

        this.comments = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingPosts = false;
      }
    },
  },

  mounted() {
    this.fetchPost();
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
