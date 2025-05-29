import { defineStore } from 'pinia';
import { useUIStore } from './UIStore';
import axios from 'axios';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [],
  }),
  actions: {
    async fetchComments(id) {
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
