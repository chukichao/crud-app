import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: null,
    userData: null,
  }),
  actions: {
    login(username, userData = null) {
      this.auth = { ...username, token: String(Math.random()).slice(2) };
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
