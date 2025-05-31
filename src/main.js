import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';

import { createPinia } from 'pinia';
import router from './router/router.js';

import componentsUI from '../src/components/UI';

const app = createApp(App);
const pinia = createPinia();

componentsUI.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);
app.use(pinia);
app.mount('#app');
