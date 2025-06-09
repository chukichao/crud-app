export const hasDataLocalStorage = (key: string) =>
	localStorage.getItem(key) ? true : false;
