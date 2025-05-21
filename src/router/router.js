import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import AboutPage from '../pages/AboutPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import PostsPage from '../pages/PostsPage.vue';
import CommentsPage from '../pages/CommentsPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

// const ... = () => import('...')

const auth = true;

const privateRoutes = auth
  ? [
      { path: '/posts', component: PostsPage },
      { path: '/posts/:id', component: CommentsPage }, // /posts/:id?
    ]
  : [];

const router = createRouter({
  history: createWebHistory(), // createMemoryHistory, createWebHashHistory
  routes: [
    { path: '/', component: HomePage }, // alias: '/...'
    { path: '/about', component: AboutPage }, // beforeEnter() { ... }
    { path: '/signup', component: RegistrationPage },
    ...privateRoutes,
    { path: '/:notFound(.*)', component: NotFoundPage },
    // { path: '/:notFound(.*)', redirect: '/' }, // редирект
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

// children: [ { path: '/...', component: ... }, { path: '/...', component: ... } ] // вложенный роутер
// <RouterView /> // использование внутри компонента

// props: true // передача параметров в качестве пропсов

// ---------------------------------------------------------

// router.beforeEach((to, from, next) => {
//   // meta: {...}
//   if(to.meta ...) {
//     next(false)
//   } else {
//     next()
//   }

// next('...') // редирект

// name: '...'
// next({name: '...'})
// });

// router.afterEach((to, from) => {

// });

export default router;
