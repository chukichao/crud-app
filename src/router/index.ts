import { createRouter, createWebHistory } from "vue-router";

import { routes } from "../routes/index.ts";

import { hasDataLocalStorage } from "../utils/auth.ts";

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active",
	linkExactActiveClass: "active",
});

router.beforeEach((to, _, next) => {
	const isPrivateRoute = to.matched.some((record) => record.meta.requiresAuth);

	if (!isPrivateRoute) {
		next();
		return;
	}

	if (hasDataLocalStorage("auth")) {
		next();
	} else {
		next("/");
	}
});

export default router;
