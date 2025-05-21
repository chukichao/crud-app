import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import componentsUI from '../src/components/UI';

const app = createApp(App); // процесс инициализации приложения

componentsUI.forEach((component) => {
  app.component(component.name, component); // регистрация глобальных компонентов
});

// -------------------------------------------------------------------------------------

app.component(
  // регистрация глобальных асинхронных компонентов
  'async-logo',
  defineAsyncComponent(() => {
    return import('./components/AsyncLogo.vue');
  }),
);

// -------------------------------------------------------------------------------------

// export const logoMixin = {
// в отдельном файле
// использование миксинов (доступны всем компонентам)
//   data() {
//     return {
//       logo: 'Logo',
//     };
//   },
// };

// app.mixin(logoMixin).mount('#app'); // не рекомендуется
// рекомендуется подключать локально в компоненте

// -------------------------------------------------------------------------------------

// export const focusDirective = {
// в отдельном файле
// создание глобальных директив (доступны всем компонентам; v-...)
//   mounted(el) {
//     el.focus();
//   },
// };

// app.directive('focus', focusDirective).mount('#app'); // не рекомендуется
// рекомендуется создавать локально в компоненте

// через импорт массива директив
// directives.forEach((directive) => {
//   app.directive(directive.name, directive);
// });

// -------------------------------------------------------------------------------------

// const somePlugin = {
// в отдельном файле
// создание плагина
// install(app, options) {
//   console.log(app); // объект приложения
//   console.log(options); // передаваемые опции

// app.config.globalProperties.$ ... = () => { // создание глобальных переменных
// ...
// }
//   },
// };

// app.use(somePlugin); // 2 арг. - опции

// -------------------------------------------------------------------------------------

app.use(router).mount('#app'); // процесс монтирования приложения в DOM

// --------------------------------------------------------------------
// import { createApp } from 'vue';
// import App from './components/testing/App.vue';

// const app = createApp(App);

// app.mount('#app');
