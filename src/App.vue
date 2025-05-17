<!-- <template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template> -->

<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue';
</script> -->

<template>
  <!-- <keep-alive>
    ...
  </keep-alive> -->

  <Header
    @setActivePage="setActivePage"
    @login="login"
    @logout="logout"
    :auth="auth"
    :activePage="ui.activePage"
  />

  <main>
    <component
      v-if="ui.activePage === 'RegistrationPage'"
      :is="componentName"
      @register="registerAccount"
    ></component>
    <component v-else :is="componentName"></component>
  </main>

  <Footer></Footer>

  <alert-ui v-if="ui.cookieAlert">
    <h3>Добро пожаловать!</h3>
    <p style="margin: 1rem 0">
      Наша платформа использует cookie с целью обеспечения корректной работы
      сайта и Вашего комфортного взаимодействия с ним.
    </p>
    <button-ui
      @click="ui.cookieAlert = false"
      style="background-color: white; border-radius: 5px"
      >Принять</button-ui
    >
  </alert-ui>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import HomePage from './pages/HomePage.vue';
import PostsPage from './pages/PostsPage.vue';
import RegistrationPage from './pages/RegistrationPage.vue';

export default {
  data() {
    return {
      user: {},
      auth: false,
      ui: {
        activePage: 'HomePage', // PostsPage, RegistrationPage
        cookieAlert: true,
      },
    };
  },

  methods: {
    login(userData) {
      console.log(userData);
      this.auth = true;

      this.ui.activePage = 'HomePage';
    },
    logout() {
      this.user = {};
      this.auth = false;

      this.ui.activePage = 'HomePage';
    },
    setActivePage(page) {
      this.ui.activePage = page;
    },
    registerAccount(user) {
      this.auth = true;

      this.user = user;
      this.ui.activePage = 'HomePage';
    },
  },

  computed: {
    // get() {
    //   return ...
    // }

    // set(value) {
    //   this. ... = value;
    // }

    componentName() {
      return this.ui.activePage;
    },
  },

  components: {
    Header,
    Footer,
    HomePage,
    PostsPage,
    RegistrationPage,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100vh;

  font-family: Tahoma, Verdana, sans-serif;
}

main {
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 2rem;

  min-width: 700px;
  max-width: 700px;

  h1 {
    text-align: center;
    margin: 5rem auto;

    font-size: 3rem;
  }
}

@media screen and (max-width: 700px) {
  main {
    min-width: 350px;
  }
}
</style>
