import { useCallback, useEffect, useMemo, useState } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import animations from "./assets/data/animations.json";
import CardList from "./components/CardList";
import { Heading } from "./components/Heading";

import { Docs } from "./components/Docs";
import { Footer } from "./components/Footer";

type Category = {
	id: number;
	title: string;
	description: string;
	animations: string[];
};

const welcomeCategory: Category = {
	id: 0,
	title: "Animated",
	description: "Easy and modern tailwind v4 animations",
	animations: [],
};

const getCategoryByTitle = (title: Category["title"]): Category => {
	return (
		animations.find((category) => category.title === title) ?? welcomeCategory
	);
};

function App() {
	const [selectedAnimationName, setSelectedAnimationName] = useState<string>(
		() => window.location.pathname.replace("/", "") || "Animated",
	);

	const selectedCategory = useMemo(() => {
		return getCategoryByTitle(selectedAnimationName);
	}, [selectedAnimationName]);

	const [displayedAnimation, setDisplayedAnimation] =
		useState<Category>(selectedCategory);
	const [isExiting, setIsExiting] = useState(false);

	const handleChangeCategory = useCallback((newCategory: Category) => {
		setIsExiting(true);
		window.history.pushState({}, "", newCategory.title);
		setTimeout(() => {
			setDisplayedAnimation(newCategory);
			setSelectedAnimationName(newCategory.title);
			setIsExiting(false);
		}, 600);
	}, []);

	useEffect(() => {
		document.title = `Animated - ${selectedCategory.title} | Pol Gubau`;
	}, [selectedCategory]);

	const currentIdx = useMemo(
		() => animations.findIndex((section) => section.id === selectedCategory.id),
		[selectedCategory.id],
	);
	const nextIndex = (currentIdx + 1) % animations.length;
	const prevIndex = (currentIdx - 1 + animations.length) % animations.length;

	return (
		<main className="grid md:grid-cols-[380px_1fr] xl:grid-cols-[450px_1fr] 2xl:grid-cols-[500px_1fr] md:h-screen">
			<aside className="md:h-screen w-full flex flex-col p-8 bg-gray-200 dark:bg-gray-950">
				<header>
					<h1 className="flex gap-1 items-center text-lg font-semibold">
						<a
							href="https://www.polgubau.com"
							className="opacity-70 hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							@polgubau/
						</a>
						<button
							type="button"
							onClick={() => handleChangeCategory(welcomeCategory)}
							className="font-bold"
						>
							Animated
						</button>
					</h1>
				</header>

				<section className="flex gap-1 flex-col h-full md:pt-72 ">
					<h1>
						<Heading
							text={displayedAnimation.title ?? "Animated"}
							isExiting={isExiting}
							className="text-6xl xl:text-8xl font-bold"
							enterAnimation="animate-slide-in-top"
							exitAnimation="animate-slide-out-top"
						/>
					</h1>
					<Heading
						text={displayedAnimation.description}
						isExiting={isExiting}
						delay={0.01}
						className="pl-2 text-lg opacity-70"
						enterAnimation="animate-slide-in-top"
						exitAnimation="animate-slide-out-top"
					/>
					<nav className="flex items-center gap-3 mt-6">
						<button
							aria-label="Previous category"
							title="Previous category"
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-gray-300/5 hover:bg-gray-300/80 transition-all"
							onClick={() => handleChangeCategory(animations[prevIndex])}
							type="button"
						>
							<TbArrowLeft />
						</button>
						<button
							aria-label="Next category"
							title="Next category"
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-gray-300/5 hover:bg-gray-300/80 transition-all"
							onClick={() => handleChangeCategory(animations[nextIndex])}
							type="button"
						>
							<TbArrowRight />
						</button>
					</nav>
				</section>

				<section className="flex flex-col gap-6">
					<ul className="mt-6">
						{animations.map((animation) => (
							<li key={animation.id}>
								<button
									type="button"
									onClick={() => handleChangeCategory(animation)}
									className={`text-2xl font-semibold  outline-0 focus-visible:outline-1 rounded-md overflow-hidden relative flex items-start justify-start text-start
                    ${displayedAnimation.id === animation.id ? "underline" : ""}`}
								>
									<div
										className={`absolute inset-0 bg-yellow-400 dark:bg-yellow-900 transition-all left-0 top-0 text-transparent
                      ${displayedAnimation.id === animation.id ? "animate-grow-x-in-left" : "animate-grow-x-out-left"}`}
										style={{ animationFillMode: "both" }}
									>
										{animation.title}
									</div>
									<span className="relative">{animation.title}</span>
								</button>
							</li>
						))}
						<li className="pt-4">
							<button
								type="button"
								onClick={() => handleChangeCategory(welcomeCategory)}
								className={`text-xl opacity-90 font-semibold  outline-0 focus-visible:outline-1 rounded-md overflow-hidden relative flex items-start justify-start text-start
										${displayedAnimation.id === welcomeCategory.id ? "underline" : ""}`}
							>
								<div
									className={`absolute inset-0 bg-yellow-400 dark:bg-yellow-900 transition-all left-0 top-0 text-transparent
											${displayedAnimation.id === welcomeCategory.id ? "animate-grow-x-in-left" : "animate-grow-x-out-left"}`}
									style={{ animationFillMode: "both" }}
								>
									{welcomeCategory.title}
								</div>
								<span className="relative">Docs</span>
							</button>
						</li>
					</ul>
					<Footer />
				</section>
			</aside>

			<section className="p-10 overflow-y-auto">
				{displayedAnimation.animations.length > 0 ? (
					<CardList
						animations={displayedAnimation.animations}
						isExiting={isExiting}
					/>
				) : (
					<Docs isExiting={isExiting} />
				)}
			</section>
		</main>
	);
}

export default App;
