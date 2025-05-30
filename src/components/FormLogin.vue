<template>
  <h2>Login</h2>

  <form class="form" @submit.prevent="login">
    <InputUI
      :class="{ errorInput: errorLogin }"
      v-model.trim="user.username"
      autocomplete="username"
      placeholder="username"
      ref="input"
    />

    <InputUI
      :class="{ errorInput: errorLogin }"
      type="password"
      v-model.trim="user.password"
      autocomplete="current-password"
      placeholder="password"
    />

    <div class="errorFeedback" v-show="errorLogin">
      Incorrect username or password
    </div>

    <ButtonUI :disabled="disabledButton">Sign in</ButtonUI>
  </form>
</template>

<!-- COMPOSITION API -->

<script setup>
import { useUIStore } from '../store/UIStore.js';
import { useUserStore } from '../store/UserStore.js';

import { reactive, ref, computed, useTemplateRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const uiStore = useUIStore();
const userStore = useUserStore();

const router = useRouter();

const input = useTemplateRef('input');

let user = reactive({
  username: '',
  password: '',
});

const errorLogin = ref(null);

const login = () => {
  const database = JSON.parse(localStorage.getItem('database'));
  const _user = database.users.find(
    (_user) => _user.username === user.username,
  );

  if (!_user || _user.password !== user.password) {
    errorLogin.value = true;
    return;
  }

  errorLogin.value = false;

  const authData = {
    username: user.username,
    token: String(Math.random()).slice(2),
  };
  userStore.login(authData);

  user = {
    username: '',
    password: '',
  };

  uiStore.closeModal();
  router.push('/');
};

const disabledButton = computed(() => {
  if (user.username.length >= 1 && user.password.length >= 1) {
    return false;
  }

  return true;
});

onMounted(() => {
  input.value.getInputRef().focus();
});
</script>

<!-- OPTIONS API -->

<!-- <script>
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
      errorLogin: null,
    };
  },

  methods: {
    login() {
      const database = JSON.parse(localStorage.getItem('database'));
      const user = database.users.find(
        (user) => user.username === this.user.username,
      );

      if (!user || user.password !== this.user.password) {
        this.errorLogin = true;
        return;
      }

      this.errorLogin = false;

      const authData = {
        username: this.user.username,
        token: String(Math.random()).slice(2),
      };
      this.userStore.login(authData);

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
    this.$refs.input.getInputRef().focus();
  },
};
</script> -->

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

.errorInput {
  border: 2px solid red;
}

.errorFeedback {
  align-self: flex-start;
  color: red;
  font-size: 10px;
}
</style>
