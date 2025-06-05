import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: null,
    userData: null,
  }),
  actions: {
    login(authData, userData) {
      this.auth = { ...authData };
      localStorage.setItem('auth', JSON.stringify(this.auth));

      this.userData = userData;

      const database = JSON.parse(localStorage.getItem('database'));
      const isExistUser = database.users.find(
        (user) => user.username === authData.username,
      );

      if (!isExistUser) {
        database.users = [...database.users, userData];
        localStorage.setItem('database', JSON.stringify(database));
      }
    },
    logout() {
      this.auth = null;
      this.userData = null;
      localStorage.removeItem('auth');
    },
  },
});
