<template>
  <li>
    <div class="post-item" @click="$router.push(`/posts/${post.id}`)">
      <ButtonUI
        @click.stop="postsStore.removePost(post.id)"
        class="post-item-delete"
      >
        &times;
      </ButtonUI>

      <div class="post-item-content">
        <div class="post-item-content-body">
          <h3>{{ post.id }}. {{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
        <div class="post-item-content-edit">
          <ButtonUI @click.stop="uiStore.openModal('editPost', post.id)">
            Edit
          </ButtonUI>
        </div>
      </div>
    </div>

    <ModalUI v-if="uiStore.modal.extra === post.id">
      <FormUpdatePost :title="post.title" :body="post.body" :id="post.id" />
    </ModalUI>
  </li>
</template>

<!-- COMPOSITION API -->

<script setup>
import FormUpdatePost from './FormUpdatePost.vue';

import { usePostsStore } from '../store/PostsStore';
import { useUIStore } from '../store/UIStore.js';

const postsStore = usePostsStore();
const uiStore = useUIStore();

const props = defineProps({
  post: Object,
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import FormUpdatePost from './FormUpdatePost.vue';

import { mapStores } from 'pinia';
import { usePostsStore } from '../store/PostsStore';
import { useUIStore } from '../store/UIStore.js';

export default {
  props: {
    post: Object,
  },

  computed: {
    ...mapStores(usePostsStore, useUIStore),
  },

  components: {
    FormUpdatePost,
  },
};
</script> -->

<style scoped lang="scss">
.post-item {
  display: flex;
  flex-direction: column;

  padding: 0 0 2rem 2rem;
  margin-top: 1rem;

  border: 2px solid #333;

  cursor: pointer;

  &:hover {
    box-shadow: 5px 5px 5px #333;
  }

  &-delete {
    align-self: end;
    border: none;

    &:hover {
      background-color: #333;
      color: white;
    }
  }

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 2rem;

    &-body {
      p {
        padding: 0.5rem;
        margin: 1rem 0;

        text-indent: 0.5rem;
      }
    }

    &-edit {
      margin: 1rem;

      button:hover {
        background: bisque;
      }
    }
  }
}
</style>
