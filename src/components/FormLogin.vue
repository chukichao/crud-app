<template>
  <h2>Login</h2>

  <form class="form" @submit.prevent="login">
    <InputUI
      v-model.trim="user.username"
      autocomplete="username"
      placeholder="username"
      ref="input"
    />

    <InputUI
      type="password"
      v-model.trim="user.password"
      autocomplete="current-password"
      placeholder="password"
    />

    <ButtonUI :disabled="disabledButton">Sign in</ButtonUI>
  </form>
</template>

<!-- COMPOSITION API -->

<script setup>
import { useUIStore } from '../store/UIStore.js';
import { useUserStore } from '../store/UserStore.js';

import { reactive, computed, useTemplateRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const uiStore = useUIStore();
const userStore = useUserStore();

const router = useRouter();

const input = useTemplateRef('input');

let user = reactive({
  username: '',
  password: '',
});

const login = () => {
  userStore.login(user);

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
    };
  },

  methods: {
    login() {
      this.userStore.login(this.user);

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
</style>
