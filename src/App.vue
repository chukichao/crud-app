<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <Footer />

  <CookieAlert v-show="uiStore.cookieAlert" />
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieAlert from './components/CookieAlert.vue';

import { useUserStore } from './store/UserStore.js';
import { useUIStore } from './store/UIStore.js';

import { onMounted } from 'vue';

import { hasDataLocalStorage } from './utils/auth.js';

const userStore = useUserStore();
const uiStore = useUIStore();

onMounted(() => {
  if (!hasDataLocalStorage('database')) {
    localStorage.setItem(
      'database',
      JSON.stringify({
        users: [
          {
            username: 'admin',
            password: 'admin',
            age: 0,
            isAgreeWithRules: true,
            id: String(Math.random()).slice(2),
          },
        ],
      }),
    );
  }

  if (hasDataLocalStorage('auth')) {
    const user = localStorage.getItem('auth') as string;
    userStore.login(JSON.parse(user));
  }

  if (hasDataLocalStorage('cookie')) {
    uiStore.closeCookieAlert();
  }
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieAlert from './components/CookieAlert.vue';

import { mapStores } from 'pinia';
import { useUserStore } from './store/UserStore.js';
import { useUIStore } from './store/UIStore.js';

export default {
  computed: {
    ...mapStores(useUserStore, useUIStore),
  },

  mounted() {
    const database = localStorage.getItem('database');
    if (!database) {
      localStorage.setItem(
        'database',
        JSON.stringify({
          users: [
            {
              username: 'admin',
              password: 'admin',
              id: String(Math.random()).slice(2),
            },
          ],
        }),
      );
    }

    const user = localStorage.getItem('auth');
    if (user) {
      this.userStore.login(JSON.parse(user));
    }

    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.uiStore.closeCookieAlert();
    }
  },

  components: {
    Header,
    Footer,
    CookieAlert,
  },
};
</script> -->

<style lang="scss">
main {
  display: flex;
  flex-direction: column;

  max-width: 700px;

  margin: 0 auto;
  padding: 2rem;

  h1 {
    margin: 5rem auto;

    font-size: 2rem;

    text-align: center;
  }
}

@media screen and (max-width: 600px) {
  main {
    min-width: 250px;
  }
}
</style>
