import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const callback = (entries: any) => {
      if (entries[0].isIntersecting) {
        binding.value({ scroll: true });
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
};
