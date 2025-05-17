<template>
  <h1>Posts Page</h1>

  <div class="post-add-button">
    <button-ui @click="toggleModalAddPost" title="Add new post">+</button-ui>
  </div>

  <PostList
    :posts="posts"
    @remove="removePost"
    @update="updatePost"
    :loader="loader"
  />

  <modal-ui :isOpen="isOpenModalAddPost" @toggle="toggleModalAddPost">
    <FormAddPost @create="createPost" />

    <!-- <template #:header> // по наименованию
      <h2>Create post</h2>
    </template> -->

    <!-- v-slot: // альт. -->

    <!-- #:header="slotProps" // объект для доступа к передаваемым внутренним пропсам слота (при необходимости) -->
  </modal-ui>
</template>

<script>
import FormAddPost from '../components/FormAddPost.vue';
import PostList from '../components/PostList.vue';

import PostsService from '../API/PostsService.js';

export default {
  data() {
    return {
      posts: [],
      isOpenModalAddPost: false,
      loader: false,
    };
  },

  provide() {
    // передача данных дочерним компонентам (при необходимости)
    return {
      title: 'Posts List',
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.isOpenModalAddPost = false;
    },
    toggleModalAddPost() {
      this.isOpenModalAddPost = !this.isOpenModalAddPost;
    },
    removePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    updatePost(id, updatePost) {
      const post = this.posts.find((post) => post.id === id);

      const newPost = {
        ...post,
        ...updatePost,
      };

      this.posts = this.posts.filter((post) => post.id !== id);
      this.posts.unshift(newPost);
    },
    async getPosts() {
      try {
        this.loader = true;

        const response = await PostsService.getAllPosts();
        this.posts = response.data;

        this.loader = false;
      } catch (error) {
        this.loader = false;
        console.error(error);
      }
    },
  },

  mounted() {
    this.getPosts();
  },

  components: {
    FormAddPost,
    PostList,
  },
};
</script>

<style scoped lang="scss">
.post-add-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  background-color: bisque;
  border-radius: 50%;
  border: 1px solid #333;

  transition: 1s;

  &:hover {
    transform: scale(1.1);
  }

  button {
    border: none;
    font-size: 20px;
  }
}
</style>
