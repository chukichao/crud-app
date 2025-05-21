<template>
  <h1>Posts Page</h1>

  <input-ui
    type="search"
    v-model.trim="searchQuery"
    placeholder="search"
    class="search"
    v-focus
  />

  <!-- <pagination-ui :totalPages="totalPages" @setPage="setPage" :page="page" /> -->

  <PostList
    :posts="sortedAndSearchedPosts"
    @remove="removePost"
    @update="updatePost"
    :isLoadingPosts="isLoadingPosts"
  />

  <div
    class="observer"
    v-observer="{
      loadingMorePosts,
      page,
      totalPages,
    }"
  ></div>

  <div class="sort">
    <select-ui
      :options="[
        { title: 5, value: 5 },
        { title: 10, value: 10 },
        { title: 25, value: 25 },
      ]"
      :defaultValue="10"
      v-model="limit"
      title="limit"
    >
    </select-ui>
    <select-ui
      :options="sortOptions"
      :defaultValue="selectedSort"
      v-model="selectedSort"
      title="sort by"
    >
    </select-ui>
  </div>

  <div class="post-add-button">
    <button-ui @click="toggleModal" title="Add new post">+</button-ui>
  </div>

  <teleport to="body">
    <modal-ui :isOpen="isOpenModal" @toggle="toggleModal">
      <FormAddPost @create="createPost" />
    </modal-ui>
  </teleport>
</template>

<script>
import axios from 'axios';

import FormAddPost from '../components/FormAddPost.vue';
import PostList from '../components/PostList.vue';

import VIntersection from '../directives/VIntersection.js';
import VFocus from '../directives/VFocus.js';

import modalMixin from '../mixins/modalMixin.js';

export default {
  data() {
    return {
      posts: [],
      isLoadingPosts: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { title: 'by title', value: 'title' },
        { title: 'by body', value: 'body' },
      ],
    };
  },

  directives: {
    observer: VIntersection,
    focus: VFocus,
  },

  mixins: [modalMixin],

  provide() {
    // передача данных дочерним компонентам (при необходимости)
    return {
      title: 'Posts List',
    };
  },

  methods: {
    createPost(newPost) {
      this.posts.unshift(newPost);
      this.isOpenModal = false;
    },
    removePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    updatePost(id, updatedPost) {
      const post = this.posts.find((post) => post.id === id);

      const newPost = {
        ...post,
        ...updatedPost,
      };

      this.posts = this.posts.filter((post) => post.id !== id);
      this.posts.unshift(newPost);
    },
    // setPage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isLoadingPosts = true;

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`,
          // {
          //   _page: this.page,
          //   _limit: this.limit,
          // },
        );

        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );

        this.posts = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingPosts = false;
      }
    },
    async loadingMorePosts() {
      try {
        this.page += 1;
        this.isLoadingPosts = true;

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`,
          // {
          //   _page: this.page,
          //   _limit: this.limit,
          // },
        );

        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );

        // this.posts = response.data;
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingPosts = false;
      }
    },
  },

  mounted() {
    this.fetchPosts();
  },

  computed: {
    // вычисляемые свойства
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },

  watch: {
    // page() {
    //   this.fetchPosts();
    // },
    // limit() {
    //   this.page = 1;
    //   this.fetchPosts();
    // },
  },

  // watch: { // наблюдаемые свойства
  //   selectedSort(newValue) {
  //     this.posts.sort((post1, post2) =>
  //       post1[newValue]?.localeCompare(post2[newValue]),
  //     );
  //   },
  // ...: { // при работе с объектами и массивами (глубокой вложенностью)
  //   handleError(value {
  //     // ...
  //   }),
  //   deep: true
  // }
  // },

  components: {
    FormAddPost,
    PostList,
  },
};
</script>

<style scoped lang="scss">
.post-add-button {
  position: fixed;
  bottom: 3rem;
  right: 3rem;

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

.sort {
  position: fixed;
  bottom: 0;
  right: 0;

  padding: 0.5rem;
}

.search {
  padding: 1rem;
  font-size: 20px;
  border-radius: 1rem;

  &::placeholder {
    font-style: italic;
  }

  &:focus {
    outline: 2px solid #333;
  }
}

.observer {
  height: 1px;
}
</style>
