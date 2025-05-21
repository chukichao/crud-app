<template>
  <header class="header">
    <nav>
      <ul>
        <async-logo />
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>

        <li>
          <RouterLink to="/about">About Us</RouterLink>
        </li>

        <li>
          <RouterLink
            v-if="auth"
            to="/posts"
            custom
            v-slot="{ navigate, href }"
          >
            <a
              href="#"
              @click="navigate"
              :class="{ active: $route.path.indexOf(href) !== -1 }"
              >Posts</a
            >
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div v-if="auth">
      <button-ui @click="$emit('logout')">Logout</button-ui>
    </div>

    <div v-else>
      <button-ui><RouterLink to="/signup">Sign up</RouterLink></button-ui>

      <button-ui @click="toggleModal">Sign in</button-ui>
    </div>

    <teleport to="body">
      <modal-ui :isOpen="isOpenModal" @toggle="toggleModal">
        <FormLogin @login="$emit('login')" @toggle="toggleModal" />

        <!-- <template #:...> // по наименованию (v-slot: - альт.)
        ...
        </template> -->

        <!-- #:...="slotProps" // объект для доступа к передаваемым внутренним пропсам слота (при необходимости) -->
      </modal-ui>
    </teleport>

    <!-- $emit('login', $event) -->
    <!-- (userData) => $emit('login', userData) -->
  </header>
</template>

<script>
import FormLogin from './FormLogin.vue';

import modalMixin from '../mixins/modalMixin';

export default {
  props: {
    auth: Boolean,
  },

  mixins: [modalMixin],

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

@media screen and (max-width: 480px) {
  .header {
    ul {
      flex-direction: column;
    }
  }
}
</style>
