import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import AboutPage from '../pages/AboutPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import PostsPage from '../pages/PostsPage.vue';
import CommentsPage from '../pages/CommentsPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const auth = true;

const privateRoutes = auth
  ? [
      { path: '/posts', component: PostsPage },
      { path: '/posts/:id', component: CommentsPage },
    ]
  : [];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/signup', component: RegistrationPage },
    ...privateRoutes,
    { path: '/:notFound(.*)', component: NotFoundPage },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

export default router;
