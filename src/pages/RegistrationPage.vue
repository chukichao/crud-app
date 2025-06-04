<template>
  <h1 id="heading">Registration Page</h1>

  <form class="form" @submit.prevent="registerAccount">
    <div class="form-main">
      <label
        >Name:
        <InputUI
          v-model.trim="user.username"
          autocomplete="username"
          :class="required"
        ></InputUI>
      </label>

      <label
        >Age:
        <InputUI
          v-model.number="user.age"
          type="number"
          :class="required"
        ></InputUI>
      </label>

      <label
        >Password:
        <InputUI
          v-model.trim="user.password"
          type="password"
          autocomplete="new-password"
          :class="(required, confirm)"
        ></InputUI>
      </label>

      <label
        >Confirm Password:
        <InputUI
          v-model.trim="confirmPassword"
          type="password"
          autocomplete="new-password"
          :class="(required, confirm)"
        ></InputUI>
      </label>

      <div class="form-rules">
        <label
          ><input
            :class="required"
            v-model="user.isAgreeWithRules"
            type="checkbox"
          />
          I have read the privacy policy (required)</label
        >
      </div>

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

    <ButtonUI>Sign up</ButtonUI>
  </form>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { useUserStore } from '../store/UserStore.js';

import { ref, reactive, computed, watch } from 'vue';

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
  isAgreeWithRules: false,
});

const confirmPassword = ref(null);

const errors = reactive({
  requiredError: false,
  confirmError: false,
});

const errorFeedback = ref('');

const countryOptions = reactive([
  { title: 'Russia', value: 'russia' },
  { title: 'Belarus', value: 'belarus' },
  { title: 'Ukraine', value: 'ukraine' },
]);

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
  if (!user.username || !user.password || !user.age || !user.isAgreeWithRules) {
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

  errorFeedback.value = '';

  return true;
};

const scrollToUp = () => {
  const heading = document.getElementById('heading');

  if (heading) {
    heading.scrollIntoView();
  }
};

const required = computed<string>(() => {
  return errors.requiredError ? 'error-outline-required' : '';
});

const confirm = computed<string>(() => {
  return errors.confirmError ? 'error-outline-confirm' : '';
});

watch(errors, () => {
  scrollToUp();
});
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
        isAgreeWithRules: false,
      },
      confirmPassword: null,
      errors: {
        requiredError: false,
        confirmError: false,
      },
      errorFeedback: '',
      countryOptions: [
        { title: 'Russia', value: 'russia' },
        { title: 'Belarus', value: 'belarus' },
        { title: 'Ukraine', value: 'ukraine' },
      ],
    };
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
      if (
        !this.user.username ||
        !this.user.password ||
        !this.user.age ||
        !this.user.isAgreeWithRules
      ) {
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

      this.errorFeedback = '';

      return true;
    },
    scrollToUp() {
      document.getElementById('heading').scrollIntoView();
    },
  },

  computed: {
    ...mapStores(useUserStore),
    required() {
      return this.errors.requiredError ? 'error-outline-required' : '';
    },
    confirm() {
      return this.errors.confirmError ? 'error-outline-confirm' : '';
    },
  },

  watch: {
    'errors.confirmError'() {
      this.scrollToUp();
    },
    'errors.requiredError'() {
      this.scrollToUp();
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

  input {
    &:focus {
      outline: 1px solid #333;
    }
  }
}

.error-outline-required,
.error-outline-confirm {
  outline: 1px solid red;
}

.error-feedback {
  color: red;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
