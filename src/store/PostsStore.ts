import { defineStore } from 'pinia';
import { useUIStore } from './UIStore.ts';
import { useUserStore } from './UserStore.ts';
import axios from 'axios';

import type { IPost } from '../types/post';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as IPost[],
    page: 1,
    limit: 10,
    totalPages: 0,
    postId: 100,
  }),
  getters: {
    totalCountPosts(): number {
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
    createPost(createdPost: { title: string; body: string }) {
      const userStore = useUserStore();

      const newPost = {
        ...createdPost,
        id: ++this.postId,
        userId: userStore.userData?.id,
      };

      this.posts.unshift(newPost);
    },
    removePost(id: number) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    updatePost(id: number, updatedPost: { title: string; body: string }) {
      const post = this.posts.find((post) => post.id === id);

      const newPost: IPost = {
        ...post,
        id: id,
        ...updatedPost,
      };

      this.posts = this.posts.filter((post) => post.id !== id);
      this.posts.unshift(newPost);
    },
    setLimit(limit: number, page = 1) {
      this.limit = limit;
      this.page = page;
      this.fetchPosts();
    },
    setPage(page: number) {
      this.page = page;
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
