import { defineStore } from 'pinia';
import { useUIStore } from './UIStore.ts';
import axios from 'axios';

import type { IComment } from '../types/comment.ts';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as IComment[],
  }),
  actions: {
    async fetchComments(id: string) {
      const uiStore = useUIStore();
      try {
        uiStore.isLoading = true;

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        );

        this.comments = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        uiStore.isLoading = false;
      }
    },
  },
});
