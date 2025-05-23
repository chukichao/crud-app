<template>
  <h2>Login</h2>

  <form class="form" @submit.prevent="login">
    <input-ui
      v-model.trim="user.username"
      autocomplete="username"
      placeholder="username"
      ref="username"
    />

    <input-ui
      type="password"
      v-model.trim="user.password"
      autocomplete="current-password"
      placeholder="password"
    />

    <button-ui :disabled="disabledButton">Sign in</button-ui>
  </form>
</template>

<script>
import { mapStores } from 'pinia';

import { useUIStore } from '../store/UIStore.js';
import { useUserStore } from '../store/UserStore.js';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    login() {
      const newUser = {
        username: this.user.username,
        token: String(Math.random()).slice(2),
      };

      this.userStore.login(newUser);

      this.user = {
        username: '',
        password: '',
      };

      this.uiStore.closeModal();
      this.$router.push('/');
    },
  },

  computed: {
    ...mapStores(useUserStore, useUIStore),
    disabledButton() {
      if (this.user.username.length >= 1 && this.user.password.length >= 1) {
        return false;
      }

      return true;
    },
  },

  mounted() {
    this.$refs.username.getInputRef().focus();
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin: 1rem 0;
  font-size: 30px;
}

.form {
  display: flex;
  flex-direction: column;

  input {
    &:focus {
      outline: 1px solid #333;
    }
  }

  button {
    align-self: flex-end;
    margin-top: 1rem;

    &:hover {
      background: bisque;
    }
  }
}
</style>
