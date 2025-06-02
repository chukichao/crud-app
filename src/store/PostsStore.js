import { defineStore } from 'pinia';
import { useUIStore } from './UIStore';
import axios from 'axios';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    postId: 100,
  }),
  getters: {
    totalCountPosts() {
      return this.posts.length;
    },
  },
  actions: {
    async fetchPosts(config = { scroll: false }) {
      const uiStore = useUIStore();

      try {
        uiStore.isLoading = true;

        if (config.scroll) {
          this.page = this.page + 1;
        }

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`,
        );

        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );

        if (config.scroll) {
          this.posts = [...this.posts, ...response.data];
        } else {
          this.posts = response.data;
        }
      } catch (error) {
        console.error(error);
      } finally {
        uiStore.isLoading = false;
      }
    },
    createPost(createdPost) {
      const newPost = {
        ...createdPost,
        id: ++this.postId,
      };

      this.posts.unshift(newPost);
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
    setLimit(limit, page = 1) {
      this.limit = Number(limit);
      this.page = Number(page);
      this.fetchPosts();
    },
    setPage(page) {
      this.page = Number(page);
      this.fetchPosts();
    },
    prevPage() {
      const prevPage = this.page - 1;

      if (prevPage === 0) {
        return false;
      }

      this.page = prevPage;
      this.fetchPosts();
    },
    nextPage() {
      const nextPage = this.page + 1;

      if (nextPage > this.totalPages) {
        return false;
      }

      this.page = nextPage;
      this.fetchPosts();
    },
  },
});
