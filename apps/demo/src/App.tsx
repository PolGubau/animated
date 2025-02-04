import { useEffect, useState } from "react";

import animations from "./assets/data/animations.json";
import AnimationCard from "./components/AnimationCard";
import { Heading } from "./components/Heading";

type AnimationCategory = {
	id: number;
	title: string;
	description: string;
	animations: string[];
};

function App() {
	const [selectedAnimation, setSelectedAnimation] = useState<AnimationCategory>(
		animations[0],
	);
	const [displayedAnimation, setDisplayedAnimation] = useState(animations[0]);
	const [isExiting, setIsExiting] = useState(false);

	const currentIdx = animations.findIndex(
		(section) => section === selectedAnimation,
	);
	const nextIndex = (currentIdx + 1) % animations.length;
	const prevIndex = (currentIdx - 1 + animations.length) % animations.length;

	useEffect(() => {
		if (isExiting) {
			const timeout = setTimeout(() => {
				setDisplayedAnimation(selectedAnimation);
				setIsExiting(false);
			}, 600);
			return () => clearTimeout(timeout);
		}
	}, [isExiting, selectedAnimation]);

	const changeAnimation = (newTitle: AnimationCategory) => {
		if (newTitle !== selectedAnimation) {
			setIsExiting(true);
			setSelectedAnimation(newTitle);
		}
	};

	return (
		<main className="grid md:grid-cols-2 xl:grid-cols-[1fr_3fr] overflow-hidden md:h-screen">
			<aside className="md:h-screen w-full flex flex-col p-8 bg-slate-200 overflow-hidden">
				<header className="">
					<h1 className="flex gap-1 items-center">
						<a
							href="https://www.polgubau.com"
							className="opacity-70"
							target="_blank"
							rel="noreferrer"
						>
							@polgubau/
						</a>
						<span className="font-semibold">Animated</span>
					</h1>
				</header>
				<section className="flex gap-1 flex-col h-full md:pt-72">
					<Heading
						text={displayedAnimation.title}
						isExiting={isExiting}
						className="text-9xl font-bold"
						enterAnimation="animate-slide-in-top"
						exitAnimation="animate-slide-out-top"
					/>
					<Heading
						text={displayedAnimation.description}
						isExiting={isExiting}
						delay={0.01}
						className="pl-2"
						enterAnimation="animate-slide-in-top"
						exitAnimation="animate-slide-out-top"
					/>
					<nav className="flex items-center gap-3 mt-6">
						<button
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-slate-300/5 hover:bg-slate-300/80 transition-all "
							onClick={() => changeAnimation(animations[prevIndex])}
							type="button"
						>
							<svg
								width="24"
								height="24"
								stroke="currentColor"
								stroke-width="2"
							>
								<title>Previous</title>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 12l14 0" />
								<path d="M5 12l6 6" />
								<path d="M5 12l6 -6" />
							</svg>
						</button>
						<button
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-slate-300/5 hover:bg-slate-300/80 transition-all"
							onClick={() => changeAnimation(animations[nextIndex])}
							type="button"
						>
							<svg
								width="24"
								height="24"
								stroke="currentColor"
								stroke-width="2"
							>
								<title>Next</title>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 12l14 0" />
								<path d="M13 18l6 -6" />
								<path d="M13 6l6 6" />
							</svg>
						</button>
					</nav>
				</section>

				<section id="category_legend">
					<ul className="mt-6">
						{animations.map((animation) => (
							<li key={animation.id}>
								<button
									type="button"
									onClick={() => changeAnimation(animation)}
									className={`text-2xl font-semibold text-slate-900 outline-0 focus-visible:outline-1 rounded-md overflow-hidden relative flex items-start justify-start text-start
                    ${selectedAnimation === animation ? "underline" : ""}
                    `}
								>
									<div
										className={`absolute inset-0 bg-yellow-400 transition-all left-0 top-0 text-transparent  ${
											selectedAnimation === animation
												? "animate-grow-x-in-complete"
												: "animate-grow-x-out-complete"
										}`}
										style={{
											animationFillMode: "both",
										}}
									>
										{animation.title}
									</div>
									<span className="relative">{animation.title}</span>
								</button>
							</li>
						))}
					</ul>
				</section>
			</aside>

			<main className="p-10 overflow-y-auto">
				<ul className="mt-6 flex flex-col gap-4">
					{displayedAnimation.animations.map((animation, idx) => {
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
			</main>
		</main>
	);
}

export default App;
