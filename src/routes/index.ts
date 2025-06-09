import HomePage from "../pages/HomePage.vue";
import AboutPage from "../pages/AboutPage.vue";
import RegistrationPage from "../pages/RegistrationPage.vue";
import PostsPage from "../pages/PostsPage.vue";
import CommentsPage from "../pages/CommentsPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

export const routes = [
	{ path: "/", component: HomePage },
	{ path: "/about", component: AboutPage },
	{ path: "/signup", component: RegistrationPage },
	{ path: "/posts", component: PostsPage, meta: { requiresAuth: true } },
	{
		path: "/posts/:id",
		component: CommentsPage,
		meta: { requiresAuth: true },
	},
	{ path: "/:notFound(.*)", component: NotFoundPage },
];
