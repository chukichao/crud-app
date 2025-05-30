import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: null,
  }),
  actions: {
    login(authData, newUser = null) {
      this.auth = { ...authData };
      localStorage.setItem('auth', JSON.stringify(this.auth));

      if (!newUser) {
        return false;
      }

      const database = JSON.parse(localStorage.getItem('database'));
      database.users = [...database.users, newUser];
      localStorage.setItem('database', JSON.stringify(database));
    },
    logout() {
      this.auth = null;
      localStorage.removeItem('auth');
    },
  },
});
