<template>
  <li class="post-item" @click="$router.push(`/posts/${post.id}`)">
    <button-ui @click.stop="$emit('remove', post.id)" class="post-item-delete"
      >X</button-ui
    >

    <div class="post-item-container">
      <div class="post-item-content">
        <h3>{{ post.id }}. {{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
      <div class="post-item-edit">
        <button-ui @click.stop="toggleModal">Edit</button-ui>
      </div>
    </div>
  </li>

  <teleport to="body">
    <modal-ui :isOpen="isOpenModal" @toggle="toggleModal">
      <FormUpdatePost
        @update="(id, updatePost) => $emit('update', id, updatePost)"
        @toggle="toggleModal"
        :title="post.title"
        :body="post.body"
        :id="post.id"
      />
    </modal-ui>
  </teleport>
</template>

<script>
import FormUpdatePost from './FormUpdatePost.vue';

import modalMixin from '../mixins/modalMixin';

export default {
  // props: ['post']

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  mixins: [modalMixin],

  emits: ['remove', 'update'],

  components: {
    FormUpdatePost,
  },
};
</script>

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

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 2rem;
  }

  &-content {
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

  &-delete {
    align-self: end;
    border: none;

    &:hover {
      background-color: #333;
      color: white;
    }
  }
}
</style>
