import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import componentsUI from '../src/components/UI';

const app = createApp(App); // процесс инициализации приложения

componentsUI.forEach((component) => {
  app.component(component.name, component); // регистрация глобальных компонентов
});

app.component(
  // регистрация глобальных асинхронных компонентов
  'async-logo',
  defineAsyncComponent(() => {
    return import('./components/AsyncLogo.vue');
  }),
);

export const logoMixin = {
  // использование миксинов (доступны всем компонентам)
  data() {
    return {
      logo: 'Logo',
    };
  },
};

// app.mixin(logoMixin).mount('#app'); // не рекомендуется
// рекомендуется подключать локально в самом компоненте

app.mount('#app'); // процесс монтирования приложения в DOM

// --------------------------------------------------------------------
// import { createApp } from 'vue';
// import App from './components/testing/App.vue';

// const app = createApp(App);

// app.mount('#app');
