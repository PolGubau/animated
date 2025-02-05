import { IconReload } from "@tabler/icons-react";
import { useState } from "react";

const AnimationCard = ({
	animation,
}: {
	animation: string;
}) => {
	const [key, setKey] = useState(animation);
	const growKey = () => {
		setKey(key + 1);
	};
	const [speed, setSpeed] = useState(0.5);
	return (
		<li
			key={animation}
			className="grid grid-cols-[auto_1fr] gap-4 text-2xl font-semibold text-slate-900 p-3 bg-slate-200 rounded-xl"
		>
			<div
				className="h-20 w-20 relative grid place-items-center bg-slate-50 rounded-md aspect-square"
				key={animation}
			>
				<button
					onClick={growKey}
					type="button"
					className="absolute -top-1 -right-1 bg-slate-300/20 rounded-full"
				>
					<IconReload size={16} />
				</button>
				<span
					className={`${animation} `}
					key={key}
					style={{ animationDuration: `${speed}s` }}
				>
					Test
				</span>
			</div>

			<div className="flex flex-col gap-2">
				{animation}
				<div className="flex gap-2 items-center text-[0.7em]">
					<label htmlFor="speed">Speed:</label>
					<input
						type="range"
						min="0.1"
						max="3"
						step="0.1"
						value={speed}
						onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
					/>
					<span>{speed}s</span>
				</div>
			</div>
		</li>
	);
};

export default AnimationCard;
