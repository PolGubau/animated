import fs from "node:fs";
import path, { resolve } from "node:path";

const __dirname = resolve();
const animationsDir = path.join(__dirname, "src/animations");
const outputFile = path.join(__dirname, "dist/summary.json");

// Asegurar que la carpeta `dist` existe
if (!fs.existsSync("dist")) {
	fs.mkdirSync("dist");
}

// Función para extraer las variables CSS de un archivo
const extractCssVariables = (filePath) => {
	const content = fs.readFileSync(filePath, "utf-8");
	const regex = /--([a-zA-Z0-9-_]+):/g;
	const variables = new Set();
	let match;

	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	while ((match = regex.exec(content)) !== null) {
		variables.add(match[1]);
	}

	return Array.from(variables);
};

// Función para recopilar todas las variables CSS de `src/animations/`
const gatherVariables = () => {
	const allVariables = new Set();
	const files = fs.readdirSync(animationsDir);

	for (const file of files) {
		if (file.endsWith(".css")) {
			const filePath = path.join(animationsDir, file);
			const variables = extractCssVariables(filePath);

			for (const variable of variables) {
				allVariables.add(variable);
			}
		}
	}

	// Guardar el JSON en `dist/summary.json`
	const sortedVariables = Array.from(allVariables).sort();
	fs.writeFileSync(outputFile, JSON.stringify(sortedVariables, null, 2));

	console.log(
		`✅ summary.json actualizado: ${sortedVariables.length} variables.`,
	);
};

// Ejecutar la función al iniciar
gatherVariables();

// Si se ejecuta con `--watch`, activar la detección de cambios
if (process.argv.includes("--watch")) {
	console.log(
		"🔄 Modo WATCH activado: Esperando cambios en `src/animations/`...",
	);

	fs.watch(animationsDir, { recursive: false }, (eventType, filename) => {
		if (filename?.endsWith(".css")) {
			console.log(
				`📝 Cambio detectado en ${filename}, regenerando summary.json...`,
			);
			gatherVariables();
		}
	});
}
