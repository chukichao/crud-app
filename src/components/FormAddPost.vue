<template>
  <h2>Create post</h2>
  <form class="form" @submit.prevent="createPost">
    <input-ui v-model.trim="post.title" placeholder="title" ref="title" />
    <input-ui v-model.trim="post.body" placeholder="description" />
    <button-ui>Сonfirm</button-ui>
  </form>
</template>

<script>
import { mapStores } from 'pinia';
import { usePostsStore } from '../store/PostsStore.js';
import { useUIStore } from '../store/UIStore.js';

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },

  methods: {
    createPost() {
      if (!this.post.title || !this.post.body) {
        return;
      }

      this.post.id = Date.now();

      this.postsStore.createPost(this.post);
      this.uiStore.closeModal();

      this.post = {
        title: '',
        body: '',
      };
    },
  },

  mounted() {
    this.$refs.title.getInputRef().focus();
  },

  computed: {
    ...mapStores(usePostsStore, useUIStore),
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin: 1rem 0;

  font-size: 30px;
}

.form {
  display: flex;
  flex-direction: column;

  input {
    &:focus {
      outline: 1px solid #333;
    }
  }

  button {
    align-self: flex-end;

    margin-top: 1rem;

    &:hover {
      background: bisque;
    }
  }
}
</style>
