import { build } from "esbuild";
import { copyFileSync } from "node:fs";

copyFileSync("./src/output.css", "./dist/index.css");
build({
	entryPoints: ["src/output.css"],
	outfile: "dist/index.css",
	minify: true,
	bundle: true,
	loader: { ".css": "css" },
})
	.then(() => console.log("🟢 Build completed!"))
	.catch(() => process.exit(1));
