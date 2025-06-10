<template>
	<Header />

	<RouterView />

	<Footer />

	<CookieAlert v-show="uiStore.cookieAlert" />
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import CookieAlert from "./components/CookieAlert.vue";

import { useUserStore } from "./store/user.ts";
import { useUIStore } from "./store/ui.ts";

import { onMounted } from "vue";

import { hasDataLocalStorage } from "./utils/auth.ts";

import type { IUser } from "./types/user.ts";

const userStore = useUserStore();
const uiStore = useUIStore();

onMounted(() => {
	if (!hasDataLocalStorage("database")) {
		localStorage.setItem(
			"database",
			JSON.stringify({
				users: [
					{
						username: "admin",
						password: "admin",
						age: 0,
						isAgreeWithRules: true,
						id: String(Math.random()).slice(2),
					},
				],
			}),
		);
	}

	if (hasDataLocalStorage("auth")) {
		const user = JSON.parse(localStorage.getItem("auth") as string);
		const database = JSON.parse(localStorage.getItem("database") as string);

		const userData = database.users.find(
			(_user: IUser) => _user.username === user.username,
		);

		userStore.login(user, userData);
	}

	if (hasDataLocalStorage("cookie")) {
		uiStore.closeCookieAlert();
	}
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieAlert from './components/CookieAlert.vue';

import { mapStores } from 'pinia';
import { useUserStore } from './store/user.ts';
import { useUIStore } from './store/ui.ts';

import { hasDataLocalStorage } from './utils/auth.ts';

export default {
  computed: {
    ...mapStores(useUserStore, useUIStore),
  },

  mounted() {
    if (!hasDataLocalStorage('database')) {
      localStorage.setItem(
        'database',
        JSON.stringify({
          users: [
            {
              username: 'admin',
              password: 'admin',
              age: 0,
              isAgreeWithRules: true,
              id: String(Math.random()).slice(2),
            },
          ],
        }),
      );
    }

    if (hasDataLocalStorage('auth')) {
      const user = JSON.parse(localStorage.getItem('auth'));
      const database = JSON.parse(localStorage.getItem('database'));

      const userData = database.users.find(
        (_user) => _user.username === user.username,
      );

      this.userStore.login(user, userData);
    }

    if (hasDataLocalStorage('cookie')) {
      this.uiStore.closeCookieAlert();
    }
  },

  components: {
    Header,
    Footer,
    CookieAlert,
  },
};
</script> -->

<style lang="scss">
main {
	display: flex;
	flex-direction: column;

	max-width: 700px;

	margin: 0 auto;
	padding: 2rem;

	h1 {
		margin: 5rem auto;

		font-size: 2rem;

		text-align: center;
	}
}

@media screen and (max-width: 600px) {
	main {
		min-width: 250px;
	}
}
</style>
