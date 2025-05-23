import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    modal: {
      isOpen: false,
      type: null, // login, addPost, editPost
      extra: null,
    },
    isLoading: false,
    cookieAlert: true,
  }),
  actions: {
    openModal(type, extra = null) {
      this.modal = {
        isOpen: true,
        type: type,
        extra: extra,
      };
    },
    closeModal() {
      this.modal = {
        isOpen: false,
        type: null,
        extra: null,
      };
    },
    closeCookieAlert() {
      this.cookieAlert = false;
    },
  },
});
