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
      clearInterval(interval);
    }

    el.removeEventListener('mouseover', mouseover);
    el.removeEventListener('mouseout', mouseout);
  },
};
