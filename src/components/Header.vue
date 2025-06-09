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
						v-slot="{ navigate, href }"
						:to="`/posts?page=${postsStore.page}&limit=${postsStore.limit}`"
						custom
					>
						<a
							href="#"
							:class="{ active: $route.path.indexOf(href) !== -1 }"
							@click="navigate"
							>Posts
						</a>
					</RouterLink>
				</li>
			</ul>
		</nav>

		<div v-if="userStore.auth">
			<ButtonUI @click="uiStore.openModal('logout')">Logout</ButtonUI>
		</div>

		<div v-else>
			<ButtonUI><RouterLink to="/signup">Sign up</RouterLink></ButtonUI>

			<ButtonUI @click="uiStore.openModal('login')">Sign in</ButtonUI>
		</div>

		<ModalUI v-if="uiStore.modal.type === 'login'">
			<FormLogin />
		</ModalUI>

		<ModalUI v-if="uiStore.modal.type === 'logout'">
			<h2>Are you sure?</h2>
			<buttonUI @click="logout">Yes</buttonUI>
			<buttonUI @click="uiStore.closeModal">No</buttonUI>
		</ModalUI>
	</header>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import Logo from "./Logo.vue";
import FormLogin from "./FormLogin.vue";

import { useUIStore } from "../store/UIStore.js";
import { useUserStore } from "../store/UserStore.js";
import { usePostsStore } from "../store/PostsStore.js";

import { useRouter } from "vue-router";

const uiStore = useUIStore();
const userStore = useUserStore();
const postsStore = usePostsStore();

const router = useRouter();

const logout = () => {
	userStore.logout();
	uiStore.closeModal();
	router.push("/");
};
</script>

<!-- OPTIONS API -->

<!-- <script>
import Logo from "./Logo.vue";
import FormLogin from "./FormLogin.vue";

import { mapStores } from "pinia";
import { useUIStore } from "../store/UIStore.js";
import { useUserStore } from "../store/UserStore.js";
import { usePostsStore } from "../store/PostsStore.js";

export default {
	methods: {
		logout() {
			this.userStore.logout();
			this.uiStore.closeModal();
			this.$router.push("/");
		},
	},

	computed: {
		...mapStores(useUIStore, useUserStore, usePostsStore),
	},

	components: {
		Logo,
		FormLogin,
	},
};
</script> -->

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
		color: inherit;
		text-decoration: none;

		&:hover {
			text-shadow: 1px 1px 1px #333;

			cursor: pointer;
		}
	}

	button {
		margin-right: 1rem;
		padding: 2rem;

		font-size: 23px;

		border: none;

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
