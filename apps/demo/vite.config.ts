import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "node:path";
import { URL } from "node:url";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	resolve: {
		// alias: {
		// 	"@polgubau/animated": path.resolve(
		// 		__dirname,
		// 		"../../packages/animations/src",
		// 	),
		// },
	},
});
