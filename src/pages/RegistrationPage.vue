<template>
  <h1>Registration Page</h1>

  <form class="form" @submit.prevent="registerAccount">
    <div class="form-main">
      <label
        >Name:
        <InputUI
          v-model.trim="user.username"
          autocomplete="username"
          :class="{ required }"
        ></InputUI>
      </label>

      <label
        >Age:
        <InputUI
          v-model.number="user.age"
          type="number"
          :class="{ required }"
        ></InputUI>
      </label>

      <label
        >Password:
        <InputUI
          v-model.trim="user.password"
          type="password"
          autocomplete="new-password"
          :class="{ required, confirm }"
        ></InputUI>
      </label>

      <label
        >Confirm Password:
        <InputUI
          v-model.trim="confirmPassword"
          type="password"
          autocomplete="new-password"
          :class="{ required, confirm }"
        ></InputUI>
      </label>

      <small class="error-feedback" v-if="errorFeedback">{{
        errorFeedback
      }}</small>
    </div>

    <hr style="border-color: bisque" />

    <div class="form-country">
      <label for="country">Country:</label>
      <div>
        <SelectUI
          :options="countryOptions"
          id="country"
          v-model="user.country"
        ></SelectUI>
      </div>
    </div>

    <label
      >Date of birth:
      <InputUI v-model="user.birthday" type="date"></InputUI>
    </label>

    <div class="form-gender">
      Gender:
      <div>
        <label>
          <input v-model="user.gender" type="radio" value="male" />
          Male</label
        >
      </div>

      <div>
        <label
          ><input v-model="user.gender" type="radio" value="female" />
          Female</label
        >
      </div>
    </div>

    <div class="form-skills">
      Skills:
      <div>
        <label
          ><input v-model="user.skills" type="checkbox" value="html" />
          HTML</label
        >
      </div>

      <div>
        <label
          ><input v-model="user.skills" type="checkbox" value="css" />
          CSS</label
        >
      </div>

      <div>
        <label
          ><input v-model="user.skills" type="checkbox" value="js" /> JS</label
        >
      </div>
    </div>

    <div class="form-rules">
      <label
        ><input :class="{ required }" v-model="user.agree" type="checkbox" /> I
        have read the privacy policy (required)</label
      >
    </div>

    <ButtonUI>Sign up</ButtonUI>
  </form>
</template>

<!-- COMPOSITION API -->

<script setup>
import { useUserStore } from '../store/UserStore.js';

import { ref, reactive, computed } from 'vue';

import { useRouter } from 'vue-router';

const userStore = useUserStore();

const router = useRouter();

const user = reactive({
  username: null,
  age: null,
  password: null,
  country: null,
  birthday: null,
  gender: 'male',
  skills: [],
  agree: false,
});

const confirmPassword = ref(null);

const errors = reactive({
  requiredError: false,
  confirmError: false,
});

const errorFeedback = ref(null);

const countryOptions = reactive([
  { title: 'Russia', value: 'russia' },
  { title: 'Belarus', value: 'belarus' },
  { title: 'Ukraine', value: 'ukraine' },
]);

const required = computed(() => {
  return errors.requiredError ? 'required' : '';
});

const confirm = computed(() => {
  return errors.confirmError ? 'confirm' : '';
});

const registerAccount = () => {
  if (validate()) {
    const authData = {
      username: user.username,
      token: String(Math.random()).slice(2),
    };

    const newUser = {
      ...user,
      id: String(Math.random()).slice(2),
    };

    userStore.login(authData, newUser);
    router.push('/');
  }
};

const validate = () => {
  if (!user.username || !user.password || !user.agree) {
    errors.requiredError = true;
    errorFeedback.value = 'required field';
    return false;
  }
  errors.requiredError = false;

  if (user.password !== confirmPassword.value) {
    errors.confirmError = true;
    errorFeedback.value = 'passwords must match';
    return false;
  }
  errors.confirmError = false;

  errorFeedback.value = null;

  return true;
};
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from 'pinia';
import { useUserStore } from '../store/UserStore.js';

export default {
  data() {
    return {
      user: {
        username: null,
        age: null,
        password: null,
        country: null,
        birthday: null,
        gender: 'male',
        skills: [],
        agree: false,
      },
      confirmPassword: null,
      errors: {
        requiredError: false,
        confirmError: false,
      },
      errorFeedback: null,
      countryOptions: [
        { title: 'Russia', value: 'russia' },
        { title: 'Belarus', value: 'belarus' },
        { title: 'Ukraine', value: 'ukraine' },
      ],
    };
  },

  computed: {
    ...mapStores(useUserStore),
    required() {
      return this.errors.requiredError ? 'required' : '';
    },
    confirm() {
      return this.errors.confirmError ? 'confirm' : '';
    },
  },

  methods: {
    registerAccount() {
      if (this.validate()) {
        const authData = {
          username: this.user.username,
          token: String(Math.random()).slice(2),
        };

        const newUser = {
          ...this.user,
          id: String(Math.random()).slice(2),
        };

        this.userStore.login(authData, newUser);
        this.$router.push('/');
      }
    },
    validate() {
      if (!this.user.username || !this.user.password || !this.user.agree) {
        this.errors.requiredError = true;
        this.errorFeedback = 'required field';
        return false;
      }
      this.errors.requiredError = false;

      if (this.user.password !== this.confirmPassword) {
        this.errors.confirmError = true;
        this.errorFeedback = 'passwords must match';
        return false;
      }
      this.errors.confirmError = false;

      this.errorFeedback = null;

      return true;
    },
  },
};
</script> -->

<style scoped lang="scss">
.form {
  input,
  button {
    width: 100%;
    padding: 0.8rem;
    cursor: pointer;
  }

  input,
  select {
    &:focus {
      outline: 1px solid #333;
    }
  }

  label {
    cursor: pointer;
  }

  button {
    margin-top: 1rem;

    &:hover {
      background: bisque;
    }
  }

  &-main {
    margin: 4rem auto;
  }

  &-country {
    margin: 2rem auto;

    select {
      width: 100%;
      padding: 0.5rem;
    }
  }

  &-gender,
  &-skills,
  &-rules {
    margin: 2rem auto;

    input {
      width: auto;
    }
  }
}

.required,
.confirm {
  outline: 1px solid red;
}

.error-feedback {
  color: red;
}
</style>
