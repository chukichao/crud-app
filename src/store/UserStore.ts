import { defineStore } from "pinia";

import type { IUser } from "../types/user";

export const useUserStore = defineStore("user", {
	state: () => ({
		auth: null as IAuth | null,
		userData: null as IUser | null,
	}),
	actions: {
		login(authData: IAuth, userData: IUser) {
			this.auth = { ...authData };
			localStorage.setItem("auth", JSON.stringify(this.auth));

			this.userData = userData;

			const database = JSON.parse(localStorage.getItem("database") as string);
			const isExistUser = database.users.find(
				(user: IUser) => user.username === authData.username,
			);

			if (!isExistUser) {
				database.users = [...database.users, userData];
				localStorage.setItem("database", JSON.stringify(database));
			}
		},
		logout() {
			this.auth = null;
			this.userData = null;
			localStorage.removeItem("auth");
		},
	},
});

interface IAuth {
	username: string;
	token: string;
}
