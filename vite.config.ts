import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		host: true,
		strictPort: true,
		port: 8000,
		allowedHosts: true,
	},
});
