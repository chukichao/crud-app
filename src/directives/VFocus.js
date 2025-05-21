export default {
  mounted(el) {
    // при монтировании
    el.focus();
  },

  // updated() { // при обновлении

  // }

  // unmounted() { // при удалении

  // }

  // mounted(el, binding) { // с принимающим значением директивы v-...="..." (в кавычках)
  //   console.log(binding.value);
  // }

  // mounted(el, binding) {
  //   с принимающим параметром директивы v-...:...="..." (через двоеточие; :[...] - динамический параметр)
  //   console.log(binding.arg);
  // },

  //   mounted(el, binding) {
  //   с принимающим модификатором директивы v-... . ...="..." (через точку)
  //   console.log(binding.modifiers. ...);
  // },
};
