import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router/index.ts";

import componentsUI from "./components/UI/index.ts";

import "./assets/main.scss";

const app = createApp(App);
const pinia = createPinia();

componentsUI.forEach((component) => {
	app.component(component.name, component);
});

app.use(pinia);
app.use(router);
app.mount("#app");
