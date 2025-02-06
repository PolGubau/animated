import { context } from "esbuild";

const entryPoints = ["src/index.css"];
const outfile = "dist/index.css";

(async () => {
	try {
		const ctx = await context({
			entryPoints,
			bundle: true,
			minify: true,
			loader: { ".css": "css" },
			outfile,
		});

		await ctx.watch();

		console.log("ESBuild Watching...");
	} catch (error) {
		process.exit(1);
	}
})();
