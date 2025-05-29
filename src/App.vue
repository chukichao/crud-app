<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <Footer />

  <CookieAlert v-show="uiStore.cookieAlert" />
</template>

<!-- COMPOSITION API -->

<!-- <script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieAlert from './components/CookieAlert.vue';

import { useUserStore } from './store/UserStore.js';
import { useUIStore } from './store/UIStore.js';

import { onMounted } from 'vue';

const userStore = useUserStore();
const uiStore = useUIStore();

onMounted(() => {
  const user = localStorage.getItem('auth');

  if (user) {
    userStore.login(JSON.parse(user));
  }
});
</script> -->

<!-- OPTIONS API -->

<script>
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
    const user = localStorage.getItem('auth');

    if (user) {
      this.userStore.login(JSON.parse(user));
    }
  },

  components: {
    Header,
    Footer,
    CookieAlert,
  },
};
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 2rem;

  max-width: 700px;

  h1 {
    text-align: center;
    margin: 5rem auto;
    font-size: 2rem;
  }
}

@media screen and (max-width: 600px) {
  main {
    min-width: 250px;
  }
}
</style>
