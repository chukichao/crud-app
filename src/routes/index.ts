import AboutPage from "../pages/AboutPage.vue";
import CommentsPage from "../pages/CommentsPage.vue";
import HomePage from "../pages/HomePage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import PostsPage from "../pages/PostsPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

export const routes = [
	{ path: "/", component: HomePage },
	{ path: "/about", component: AboutPage },
	{ path: "/signup", component: SignUpPage },
	{ path: "/posts", component: PostsPage, meta: { requiresAuth: true } },
	{
		path: "/posts/:id",
		component: CommentsPage,
		meta: { requiresAuth: true },
	},
	{ path: "/:notFound(.*)", component: NotFoundPage },
];
