<template>
  <h2>Create post</h2>
  <form class="form" @submit.prevent="createPost">
    <InputUI v-model.trim="post.title" placeholder="title" ref="input" />
    <InputUI v-model.trim="post.body" placeholder="description" />
    <ButtonUI>Сonfirm</ButtonUI>
  </form>
</template>

<!-- COMPOSITION API -->

<script setup>
import { usePostsStore } from '../store/PostsStore.js';
import { useUIStore } from '../store/UIStore.js';

import { reactive, useTemplateRef, onMounted } from 'vue';

const postsStore = usePostsStore();
const uiStore = useUIStore();

const input = useTemplateRef('input');

let post = reactive({
  title: '',
  body: '',
});

const createPost = () => {
  if (!post.title || !post.body) {
    return;
  }

  postsStore.createPost(post);
  uiStore.closeModal();

  post = {
    title: '',
    body: '',
  };
};

onMounted(() => {
  input.value.getInputRef().focus();
});
</script>

<!-- OPTIONS API -->

<!-- <script>
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

      this.postsStore.createPost(this.post);
      this.uiStore.closeModal();

      this.post = {
        title: '',
        body: '',
      };
    },
  },

  computed: {
    ...mapStores(usePostsStore, useUIStore),
  },

  mounted() {
    this.$refs.input.getInputRef().focus();
  },
};
</script> -->

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
