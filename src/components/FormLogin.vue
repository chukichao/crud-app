<template>
	<div>
		<h2>Login</h2>

		<form class="form" @submit.prevent="login">
			<InputUI
				ref="input"
				v-model.trim="user.username"
				:class="{ ['error-outline']: errorLogin }"
				autocomplete="username"
				placeholder="username"
			/>

			<InputUI
				v-model.trim="user.password"
				:class="{ ['error-outline']: errorLogin }"
				type="password"
				autocomplete="current-password"
				placeholder="password"
			/>

			<div v-show="errorLogin" class="error-feedback">
				Incorrect username or password
			</div>

			<ButtonUI
				:disabled="disabledButton"
				:class="{ ['active-button']: !disabledButton }"
				>Sign in</ButtonUI
			>
		</form>
	</div>
</template>

<!-- COMPOSITION API -->

<script setup lang="ts">
import { useUIStore } from "../store/ui.ts";
import { useUserStore } from "../store/user.ts";

import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";

import type { IUser } from "../types/user.ts";

const uiStore = useUIStore();
const userStore = useUserStore();

const router = useRouter();

let user = reactive({
	username: "",
	password: "",
});

const errorLogin = ref(false);

const login = () => {
	const database = JSON.parse(localStorage.getItem("database") as string);
	const userData = database.users.find(
		(_user: IUser) => _user.username === user.username,
	);

	if (!userData || userData.password !== user.password) {
		errorLogin.value = true;
		return;
	}

	errorLogin.value = false;

	const authData = {
		username: user.username,
		token: String(Math.random()).slice(2),
	};
	userStore.login(authData, userData);

	user = {
		username: "",
		password: "",
	};

	uiStore.closeModal();
	router.push("/");
};

const disabledButton = computed(() => {
	if (user.username.length >= 1 && user.password.length >= 1) {
		return false;
	}

	return true;
});
</script>

<!-- OPTIONS API -->

<!-- <script>
import { mapStores } from "pinia";

import { useUIStore } from "../store/ui.ts";
import { useUserStore } from "../store/user.ts";

export default {
	data() {
		return {
			user: {
				username: "",
				password: "",
			},
			errorLogin: false,
		};
	},

	methods: {
		login() {
			const database = JSON.parse(localStorage.getItem("database"));
			const userData = database.users.find(
				(user) => user.username === this.user.username,
			);

			if (!userData || userData.password !== this.user.password) {
				this.errorLogin = true;
				return;
			}

			this.errorLogin = false;

			const authData = {
				username: this.user.username,
				token: String(Math.random()).slice(2),
			};
			this.userStore.login(authData, userData);

			this.user = {
				username: "",
				password: "",
			};

			this.uiStore.closeModal();
			this.$router.push("/");
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
	}
}

.active-button {
	&:hover {
		background: bisque;
	}
}

.error-outline {
	border: 2px solid red;
}

.error-feedback {
	align-self: flex-start;

	color: red;
	font-size: 10px;
}
</style>
