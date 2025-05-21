let interval;
let isShow = true;

const mouseover = (event) => {
  event.target.style.opacity = '0';
};

const mouseout = (event) => {
  event.target.style.opacity = '1';
};

export default {
  mounted(el, binding) {
    interval = setInterval(() => {
      el.style.visibility = isShow ? 'hidden' : 'visible';
      isShow = !isShow;
    }, 1000);

    if (binding.modifiers.hover) {
      el.addEventListener('mouseover', mouseover);
      el.addEventListener('mouseout', mouseout);
    }
  },

  unmounted(el) {
    if (interval) {
      clearInterval(interval); // очистка интервала
    }

    el.removeEventListener('mouseover', mouseover); // очистка слушателей событий
    el.removeEventListener('mouseout', mouseout);
  },

  // mounted(el, binding) { // с принимающим значением директивы v-...="..." (в кавычках)
  //   console.log(binding.value);
  // }

  // mounted(el, binding) {
  //   с принимающим параметром директивы v-...:...="..." (через двоеточие; :[...] - динамический параметр)
  //   console.log(binding.arg);
  // },

  //   mounted(el, binding) {
  //   с принимающим модификатором директивы v-...:...="..." (через точку)
  //   console.log(binding.modifiers. ...);
  // },

  // updated() { // при обновлении
  //   // ...
  // }

  // unmounted() { // при удалении
  //   // ...
  // }
};
