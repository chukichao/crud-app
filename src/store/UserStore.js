import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: null,
    userData: null,
  }),
  actions: {
    login(data, userData = null) {
      this.auth = data;
      localStorage.setItem('auth', JSON.stringify(this.auth));
      this.userData = userData;
    },
    logout() {
      this.auth = null;
      this.userData = null;
      localStorage.removeItem('auth');
    },
  },
});
