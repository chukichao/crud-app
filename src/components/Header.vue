<template>
  <header class="header">
    <nav>
      <ul>
        <async-logo class="header-logo" />
        <li
          @click="$emit('setActivePage', 'HomePage')"
          :class="{
            active: activePageHome,
          }"
        >
          Home
        </li>
        <li
          v-if="auth"
          @click="$emit('setActivePage', 'PostsPage')"
          :class="{
            active: activePagePosts,
          }"
        >
          Posts
        </li>
      </ul>
    </nav>

    <div v-if="auth">
      <button-ui @click="$emit('logout')">Logout</button-ui>
    </div>
    <div v-else>
      <button-ui @click="$emit('setActivePage', 'RegistrationPage')"
        >Sign up</button-ui
      >
      <button-ui @click="toggleModal">Sign in</button-ui>
    </div>

    <modal-ui :isOpen="isOpenModalLogin" @toggle="toggleModal">
      <FormLogin @login="$emit('login', $event)" @toggle="toggleModal" />
    </modal-ui>

    <!-- (userData) => $emit('login', userData) -->
  </header>
</template>

<script>
import FormLogin from './FormLogin.vue';

export default {
  data() {
    return {
      isOpenModalLogin: false,
    };
  },
  props: {
    auth: Boolean,
    activePage: String,
  },
  methods: {
    toggleModal() {
      this.isOpenModalLogin = !this.isOpenModalLogin;
    },
  },
  computed: {
    activePageHome() {
      return this.activePage === 'HomePage';
    },
    activePagePosts() {
      return this.activePage === 'PostsPage';
    },
  },
  components: {
    FormLogin,
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;

  width: 100%;

  font-size: 25px;

  ul {
    display: flex;
    list-style: none;

    li {
      padding: 1.5rem;

      &:hover {
        text-shadow: 1px 1px 1px #333;
        cursor: pointer;
      }
    }
  }

  button {
    padding: 2rem;
    margin-right: 1rem;

    border: none;

    font-size: 23px;

    transition: 2s linear;

    &:hover {
      transform: scale(1.1);
    }
  }

  &-logo {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1.5rem;
    margin-right: 1rem;

    transition: 2s linear;

    &:hover {
      cursor: default;
      transform: scale(1.1);
    }
  }
}

.active {
  font-weight: bold;
}

@media screen and (max-width: 480px) {
  .header {
    ul {
      flex-direction: column;
    }
  }
}
</style>
