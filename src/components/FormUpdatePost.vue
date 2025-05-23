<template>
  <h2>Update post</h2>

  <form class="form" @submit.prevent="updatePost">
    <div>
      <h3>Title:</h3>
      <textarea v-model.trim="post.title" v-focus placeholder="title" />
    </div>

    <div>
      <h3>Body:</h3>
      <textarea v-model.trim="post.body" placeholder="description" />
    </div>

    <button-ui>Сonfirm</button-ui>
  </form>
</template>

<script>
import { mapStores } from 'pinia';
import { usePostsStore } from '../store/PostsStore';
import { useUIStore } from '../store/UIStore.js';

import VFocus from '../directives/VFocus.js';

export default {
  props: {
    title: String,
    body: String,
    id: Number,
  },

  directives: {
    focus: VFocus,
  },

  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },

  methods: {
    updatePost() {
      if (!this.post.title || !this.post.body) {
        return;
      }

      this.postsStore.updatePost(this.id, this.post);

      this.post = {
        title: '',
        body: '',
      };

      this.uiStore.closeModal();
    },
  },

  computed: {
    ...mapStores(usePostsStore, useUIStore),
  },

  mounted() {
    this.post.title = this.title;
    this.post.body = this.body;
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
  justify-content: center;

  textarea {
    margin: 0.5rem auto;
    font-size: 1rem;

    width: 100%;
    height: 200px;

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
