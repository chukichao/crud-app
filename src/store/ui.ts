import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
	state: () => ({
		modal: {
			isOpen: false,
			type: "",
			extra: 0,
		},
		isLoading: false,
		cookieAlert: true,
	}),
	actions: {
		openModal(type: string, extra = 0) {
			this.modal = {
				isOpen: true,
				type: type,
				extra: extra,
			};
		},
		closeModal() {
			this.modal = {
				isOpen: false,
				type: "",
				extra: 0,
			};
		},
		closeCookieAlert() {
			localStorage.setItem("cookie", "true");
			this.cookieAlert = false;
		},
	},
});
