<template>
  <header class="header">
    <nav>
      <ul>
        <Logo />
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>

        <li>
          <RouterLink to="/about">About Us</RouterLink>
        </li>

        <li>
          <RouterLink
            v-if="userStore.auth"
            to="/posts"
            custom
            v-slot="{ navigate, href }"
          >
            <a
              href="#"
              @click="navigate"
              :class="{ active: $route.path.indexOf(href) !== -1 }"
              >Posts
            </a>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div v-if="userStore.auth">
      <button-ui @click="logout">Logout</button-ui>
    </div>

    <div v-else>
      <button-ui><RouterLink to="/signup">Sign up</RouterLink></button-ui>

      <button-ui @click="uiStore.openModal('login')">Sign in</button-ui>
    </div>

    <keep-alive>
      <modal-ui v-if="uiStore.modal.type === 'login'">
        <FormLogin />
      </modal-ui>
    </keep-alive>
  </header>
</template>

<script>
import Logo from './Logo.vue';
import FormLogin from './FormLogin.vue';

import { mapStores } from 'pinia';
import { useUIStore } from '../store/UIStore.js';
import { useUserStore } from '../store/UserStore.js';

export default {
  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push('/');
    },
  },

  computed: {
    ...mapStores(useUIStore, useUserStore),
  },

  components: {
    Logo,
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
    }
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-shadow: 1px 1px 1px #333;
      cursor: pointer;
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
}

.active {
  font-weight: bold;
}

@media screen and (max-width: 600px) {
  .header {
    ul {
      flex-direction: column;
    }
  }
}
</style>
