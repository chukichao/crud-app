<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <Footer />

  <teleport to="body">
    <alert-ui v-if="uiStore.cookieAlert">
      <h3>Welcome!</h3>
      <p style="margin: 1rem 0">
        Our platform uses cookies to ensure the correct operation of the site
        and your comfortable interaction with it.
      </p>
      <button-ui
        @click="uiStore.closeCookieAlert"
        style="background-color: white; border-radius: 5px"
        >Accept</button-ui
      >
    </alert-ui>
  </teleport>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

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
