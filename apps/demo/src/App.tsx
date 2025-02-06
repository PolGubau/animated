import { useCallback, useEffect, useMemo, useState } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import animations from "./assets/data/animations.json";
import CardList from "./components/CardList";
import { Heading } from "./components/Heading";

type Category = {
	id: number;
	title: string;
	description: string;
	animations: string[];
};

const getCategory = (id: string): Category => {
	return animations.find((category) => category.title === id) || animations[0];
};

function App() {
	const [selectedAnimationName, setSelectedAnimationName] = useState(
		() => window.location.pathname.replace("/", "") || animations[0].title,
	);

	const selectedCategory = useMemo(
		() => getCategory(selectedAnimationName),
		[selectedAnimationName],
	);

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
		<main className="grid md:grid-cols-2 xl:grid-cols-[1fr_3fr] overflow-hidden md:h-screen">
			<aside className="md:h-screen w-full flex flex-col p-8 bg-slate-200 overflow-hidden">
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
						<span className="text-xl">Animated</span>
					</h1>
				</header>

				<section className="flex gap-1 flex-col h-full md:pt-72 ">
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
						className="pl-2 text-lg text-gray-700"
						enterAnimation="animate-slide-in-top"
						exitAnimation="animate-slide-out-top"
					/>
					<nav className="flex items-center gap-3 mt-6">
						<button
							aria-label="Previous category"
							title="Previous category"
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-slate-300/5 hover:bg-slate-300/80 transition-all"
							onClick={() => handleChangeCategory(animations[prevIndex])}
							type="button"
						>
							<TbArrowLeft />
						</button>
						<button
							aria-label="Next category"
							title="Next category"
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-slate-300/5 hover:bg-slate-300/80 transition-all"
							onClick={() => handleChangeCategory(animations[nextIndex])}
							type="button"
						>
							<TbArrowRight />
						</button>
					</nav>
				</section>

				<section id="category_legend">
					<ul className="mt-6">
						{animations.map((animation) => (
							<li key={animation.id}>
								<button
									type="button"
									onClick={() => handleChangeCategory(animation)}
									className={`text-2xl font-semibold text-slate-900 outline-0 focus-visible:outline-1 rounded-md overflow-hidden relative flex items-start justify-start text-start
                    ${displayedAnimation.id === animation.id ? "underline" : ""}`}
								>
									<div
										className={`absolute inset-0 bg-yellow-400 transition-all left-0 top-0 text-transparent
                      ${displayedAnimation.id === animation.id ? "animate-grow-x-in-left" : "animate-grow-x-out-left"}`}
										style={{ animationFillMode: "both" }}
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

			<section className="p-10 overflow-y-auto">
				<CardList
					animations={displayedAnimation.animations}
					isExiting={isExiting}
				/>
			</section>
		</main>
	);
}

export default App;
