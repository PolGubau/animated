import fs from "node:fs";
import animations from "@polgubau/animated/summary" with { type: "json" };
if (!animations) {
	console.error("❌ Error fetching animations");
	process.exit(1);
}

// const URL = "https://pol-ui.polgubau.com/css-variables.json";
const OUTPUT_PATH = "src/assets/data/animations.json";

const categories = [
	"Fade",
	"Slide",
	"Wiggle",
	"Grow",
	"Shrink",
	"Blur",
	"Shake",
	"Pump",
	"Other",
];
const getCategory = (animation) => {
	const category = categories.find((category) =>
		animation.toLowerCase().includes(category.toLowerCase()),
	);
	return category || "Other";
};

const generateAnimationsJSON = async () => {
	try {
		const categories = {};

		for (const animation of animations) {
			const category = getCategory(animation);
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(animation);
		}

		const formattedData = Object.entries(categories).map(
			([title, animations], index) => ({
				id: index + 1,
				title,
				description: `Animations related to ${title.toLowerCase()}.`,
				animations,
			}),
		);
		const isDev = process.env.NODE_ENV === "development";
		if (isDev) {
			console.table(formattedData);
		}

		fs.writeFileSync(OUTPUT_PATH, JSON.stringify(formattedData, null, 2));
		console.log(`✅ Animations JSON generated at ${OUTPUT_PATH}`);
	} catch (error) {
		console.error("❌ Error fetching animations:", error);
		process.exit(1);
	}
};

generateAnimationsJSON();
