import AnimationCard from "./AnimationCard";

const CardList = ({
	animations,
	isExiting,
}: {
	animations: string[];
	isExiting: boolean;
}) => {
	return (
		<ul className="mt-6 flex flex-col gap-4">
			{animations.map((animation, idx) => {
				return (
					<div
						key={animation}
						className={`${isExiting ? "animate-fade-out" : "animate-fade-in"}`}
						style={{
							animationFillMode: "both",
							animationDelay: `${idx * 0.1}s`,
						}}
					>
						<AnimationCard animation={animation} />
					</div>
				);
			})}
		</ul>
	);
};

export default CardList;
