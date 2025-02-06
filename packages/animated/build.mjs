import fs from "node:fs";
import { resolve } from "node:path";
import { build } from "esbuild";

const outputPath = resolve("./src/output.css");
const distPath = resolve("./dist/index.css");

const distExists = fs.existsSync(distPath);

if (distExists) {
	fs.unlinkSync(distPath);
	console.info("🟡 Deleted dist/index.css");
}

const outputExists = fs.existsSync(outputPath);
if (!outputExists) {
	console.error("🔴 output.css not found in src folder");
	process.exit(1);
} else {
	console.info("🟢 output.css found in src folder");
}

build({
	entryPoints: [outputPath],
	outfile: distPath,
	minify: true,
	bundle: true,
	loader: { ".css": "css" },
})
	.then(() => console.log("🟢 Build completed!"))
	.catch(() => process.exit(1));
