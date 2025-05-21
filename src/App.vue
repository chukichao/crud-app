<template>
  <Header
    @login="login"
    @logout="logout"
    @register="registerAccount"
    :auth="auth"
  />

  <main>
    <RouterView />
  </main>

  <Footer />

  <!-- семантическое перемещение DOM элемента (с указанием селектора; disabled - отключено) -->
  <teleport to="body">
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
  </teleport>

  <!-- <keep-alive>
    ...
  </keep-alive> -->

  <!-- <component :is="..."> </component> -->
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  data() {
    return {
      auth: false,
      user: {},
      ui: {
        cookieAlert: true,
      },
    };
  },

  provide() {
    return {
      registerAccount: this.registerAccount,
    };
  },

  methods: {
    login() {
      this.auth = true;

      this.$router.push('/'); // this.$router.replace('/'); - без сохранения истории переходов
    },

    registerAccount(userData) {
      console.log('lorem');
      this.auth = true;
      this.user = userData;

      this.$router.push({
        path: '/',
        // query: {
        //   page: this.$route.path, // обращение к параметрам текущего пути
        // },
      });
    },

    logout() {
      this.user = {};
      this.auth = false;

      this.$router.push('/');
    },

    // this.$forceUpdate(); // принудительное обновление компонента
  },

  // computed: {
  // get() {
  //   return ...
  // }
  // set(value) {
  //   this. ... = value;
  // }
  // },

  // методы взаимодействия компонента с router
  // beforeRouteEnter(to, from) {

  // },

  // beforeRouteLeave(to, from, next) {

  // }

  components: {
    Header,
    Footer,
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

  font-family: Tahoma, Verdana, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100vh;
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
