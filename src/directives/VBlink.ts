import type { DirectiveBinding } from "vue";

let interval: number;
let isShow = true;

const mouseover = (event: Event) => {
	(event.target as HTMLElement).style.opacity = "0";
};

const mouseout = (event: Event) => {
	(event.target as HTMLElement).style.opacity = "1";
};

export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		interval = setInterval(() => {
			el.style.visibility = isShow ? "hidden" : "visible";
			isShow = !isShow;
		}, 1000);

		if (binding.modifiers.hover) {
			el.addEventListener("mouseover", mouseover);
			el.addEventListener("mouseout", mouseout);
		}
	},

	unmounted(el: HTMLElement) {
		if (interval) {
			clearInterval(interval);
		}

		el.removeEventListener("mouseover", mouseover);
		el.removeEventListener("mouseout", mouseout);
	},
};
